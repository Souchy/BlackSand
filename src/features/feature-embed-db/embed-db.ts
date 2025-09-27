import Database from '@tauri-apps/plugin-sql';

export * from './library_service';
export class EmbedDB {

	public db: Database | null = null;

	constructor() {
	}

	public async load() {
		if (this.db) return this.db;
		this.db = await Database.load('sqlite:test.db');
		return this.db;
	}

}
