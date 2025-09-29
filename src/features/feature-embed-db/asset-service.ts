import { resolve } from "aurelia";
import { EmbedDB, LibraryService, LibraryAssetService } from "./embed-db";
import { Asset } from "@/core/models/asset";
import { Library } from "@/core/models/library";

export class AssetService {
	public static readonly ASSETS_TABLE = "assets";
	private embedDb: EmbedDB = resolve(EmbedDB);
	private libraryAssetService: LibraryAssetService = resolve(LibraryAssetService);

	// 1000 most recent assets, reset on library change
	private cache: Asset[] = [];
	private currentLibrary: Library | null = null;
	private currentPage: number = 0;
	private pageSize: number = 100;

	public async createTable() {
		if (!this.embedDb.db) await this.embedDb.load();
		await this.embedDb.db.execute(`
			CREATE TABLE IF NOT EXISTS ${AssetService.ASSETS_TABLE} (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				path TEXT NOT NULL UNIQUE,
				size INTEGER NOT NULL,
				type TEXT NOT NULL,
				extension TEXT NOT NULL,
				thumbnail BLOB,
				date_created TEXT NOT NULL,
				date_modified TEXT NOT NULL
			)
		`);
	}

	public getCache(): Asset[] | null {
		return this.cache;
	}

	public async getAssets(library: Library): Promise<Asset[]> {
		if (!this.embedDb.db) throw new Error('Database not loaded');

		// If library changed, reset cache and page
		if (this.currentLibrary?.id !== library.id) {
			this.cache = [];
			this.currentPage = 0;
			this.currentLibrary = library;
		}
		const offset = this.currentPage * this.pageSize;

		// Push assets to cache
		const results = await this.embedDb.db.select<Asset[]>(
			`SELECT a.* FROM ${AssetService.ASSETS_TABLE} a
			JOIN ${LibraryAssetService.LIBRARY_ASSETS_TABLE} la ON a.id = la.asset_id 
			WHERE la.library_id = ? 
			ORDER BY a.date_modified DESC 
			LIMIT ? OFFSET ?`,
			[library.id, this.pageSize, offset]
		);
		this.cache.push(...results);
		return this.cache;
	}

	public async getAssetById(id: string): Promise<Asset | null> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		const result = await this.embedDb.db.select<Asset>(`SELECT * FROM ${AssetService.ASSETS_TABLE} WHERE id = ?`, [id]);
		return result;
	}

	public async addAsset(library: Library, asset: Asset): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		await this.embedDb.db.execute(
			`INSERT OR REPLACE INTO ${AssetService.ASSETS_TABLE} (id, name, path, type, extension, thumbnail, date_created, date_modified, size)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[asset.id, asset.name, asset.path, asset.type, asset.extension, asset.thumbnail, asset.date_created.toISOString(), asset.date_modified.toISOString(), asset.size]
		);
		await this.libraryAssetService.addAssetToLibrary(library, asset.id);
	}

	public async addAssets(library: Library, assets: Asset[]): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');

		// Batch insert assets for performance
		const insertPromises = [];
		const assetValues = assets.map(asset => `(?, ?, ?, ?, ?, ?, ?, ?, ?)`).join(', ');
		const assetParams = assets.flatMap(asset => [asset.id, asset.name, asset.path, asset.type, asset.extension, asset.thumbnail, asset.date_created.toISOString(), asset.date_modified.toISOString(), asset.size]);
		insertPromises.push(
			this.embedDb.db.execute(
				`INSERT OR REPLACE INTO ${AssetService.ASSETS_TABLE} (id, name, path, type, extension, thumbnail, date_created, date_modified, size)
			VALUES ${assetValues}`,
				assetParams
			)
		);
		// also insert into library_assets
		insertPromises.push(this.libraryAssetService.addAssetsToLibrary(library, assets.map(a => a.id)));
		// wait for all to complete
		await Promise.all(insertPromises);
	}

}
