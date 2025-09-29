import { resolve } from "aurelia";
import { EmbedDB, LibraryService, AssetService } from "./embed-db";
import { Library } from "@/core/models/library";


export class LibraryAssetService {
	public static readonly LIBRARY_ASSETS_TABLE = "library_assets";
	private embedDb: EmbedDB = resolve(EmbedDB);

	public async createTable() {
		// if (!this.embedDb.db) throw new Error('Database not loaded');
		if (!this.embedDb.db) await this.embedDb.load();
		await this.embedDb.db.execute(`
			CREATE TABLE IF NOT EXISTS ${LibraryAssetService.LIBRARY_ASSETS_TABLE} (
				library_id TEXT NOT NULL,
				asset_id TEXT NOT NULL,
				PRIMARY KEY (library_id, asset_id),
				FOREIGN KEY (asset_id) REFERENCES ${AssetService.ASSETS_TABLE}(id) ON DELETE CASCADE,
				FOREIGN KEY (library_id) REFERENCES ${LibraryService.LIBRARIES_TABLE}(id) ON DELETE CASCADE
			)
		`);
	}

	// public async getAssetsInLibrary(library: Library): Promise<string[]> {
	// 	if (!this.embedDb.db) throw new Error('Database not loaded');
	// 	const results = await this.embedDb.db.select<{ asset_id: string }[]>(`SELECT asset_id FROM ${LibraryAssetService.LIBRARY_ASSETS_TABLE} WHERE library_id = ?`, [library.id]);
	// 	return results.map(r => r.asset_id);
	// }

	public async addAssetToLibrary(library: Library, assetId: string): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		await this.embedDb.db.execute(
			`INSERT INTO ${LibraryAssetService.LIBRARY_ASSETS_TABLE} (library_id, asset_id) VALUES (?, ?)`,
			[
				library.id,
				assetId
			]
		);
	}

	// Batched version of addAssetToLibrary
	public async addAssetsToLibrary(library: Library, assetIds: string[]): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		if (assetIds.length === 0) return;
		const placeholders = assetIds.map(() => '(?, ?)').join(', ');
		const values = assetIds.flatMap(id => [library.id, id]);
		await this.embedDb.db.execute(
			`INSERT INTO ${LibraryAssetService.LIBRARY_ASSETS_TABLE} (library_id, asset_id) VALUES ${placeholders}`,
			values
		);
	}

	// public async removeAssetFromLibrary(library: Library, assetId: string): Promise<void> {
	// 	if (!this.embedDb.db) throw new Error('Database not loaded');
	// 	await this.embedDb.db.execute(
	// 		`DELETE FROM ${LibraryAssetService.LIBRARY_ASSETS_TABLE} WHERE library_id = ? AND asset_id = ?`,
	// 		[
	// 			library.id,
	// 			assetId
	// 		]
	// 	);
	// }

	// public async getLibraryForAsset(assetId: string): Promise<Library | null> {
	// 	if (!this.embedDb.db) throw new Error('Database not loaded');
	// 	const results = await this.embedDb.db.select<{ library_id: string }[]>(
	// 		`SELECT library_id FROM ${LibraryAssetService.LIBRARY_ASSETS_TABLE} WHERE asset_id = ? 
	// 		LIMIT 1`,
	// 		[assetId]
	// 	);
	// 	if (results.length === 0) return null;
	// 	return await this.libraryService.getLibraryById(results[0].library_id);
	// }
}
