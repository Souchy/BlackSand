import { resolve } from 'aurelia';
import { Library } from './../../core/models/library';
import { EmbedDB } from './embed-db';

/**
 * Todo: Implement a ILibraryService.
 * Todo: Make a component that uses the service to display libraries.
 */
export class LibraryService {
	private embedDb: EmbedDB = resolve(EmbedDB);
	// Keyed by path
	private cache: Map<string, Library> | null = null;

	public createLibrary(name: string, path: string): Library {
		const now = new Date();
		const library = new Library();
		library.id = crypto.randomUUID();
		library.name = name;
		library.path = path;
		library.recursive = true;
		library.ignore = [];
		library.date_created = now;
		library.date_modified = now;
		library.date_scanned = new Date(0);
		return library;
	}

	public async createTable() {
		// if (!this.embedDb.db) throw new Error('Database not loaded');
		if (!this.embedDb.db) await this.embedDb.load();
		await this.embedDb.db.execute(`
			CREATE TABLE IF NOT EXISTS libraries (
				id TEXT PRIMARY KEY,
				name TEXT NOT NULL,
				path TEXT NOT NULL UNIQUE,
				recursive BOOLEAN NOT NULL,
				ignore TEXT NOT NULL,
				date_created TEXT NOT NULL,
				date_modified TEXT NOT NULL,
				date_scanned TEXT NOT NULL
			)
		`);
	}

	public getCache(): Map<string, Library> | null {
		return this.cache;
	}

	public async getLibraries(): Promise<Map<string, Library>> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		if (this.cache) return this.cache;
		let libraries = this.embedDb.db.select<Library[]>('SELECT * FROM libraries');
		this.cache = new Map((await libraries).map(lib => [lib.path, lib]));
		return this.cache;
	}

	public async getLibraryById(id: string): Promise<Library | null> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		const results = await this.embedDb.db.select<Library>('SELECT * FROM libraries WHERE id = ?', [id]);
		return results[0] || null;
	}

	public async getLibraryByPath(path: string): Promise<Library | null> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		const results = await this.embedDb.db.select<Library>('SELECT * FROM libraries WHERE path = ?', [path]);
		return results[0] || null;
	}

	public async addLibrary(library: Library): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		await this.embedDb.db.execute(
			'INSERT INTO libraries (id, name, path, recursive, ignore, date_created, date_modified, date_scanned) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[
				library.id,
				library.name,
				library.path,
				library.recursive,
				library.ignore,
				library.date_created,
				library.date_modified,
				library.date_scanned
			]
		);
		this.cache.set(library.path, library);
	}

	public async updateLibrary(library: Library): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		await this.embedDb.db.execute(
			'UPDATE libraries SET name = ?, path = ?, recursive = ?, ignore = ?, date_created = ?, date_modified = ?, date_scanned = ? WHERE id = ?',
			[
				library.name,
				library.path,
				library.recursive,
				library.ignore,
				library.date_created,
				library.date_modified,
				library.date_scanned,
				library.id
			]
		);
		this.cache.set(library.path, library);
	}

	public async deleteLibrary(library: Library): Promise<void> {
		if (!this.embedDb.db) throw new Error('Database not loaded');
		await this.embedDb.db.execute('DELETE FROM libraries WHERE id = ?', [library.id]);
		this.cache.delete(library.path);
	}

}
