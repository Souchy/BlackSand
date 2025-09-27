import { IFileDialog } from "@/core/file-dialog";
import { Library } from "@/core/models/library";
import { LibraryService } from "@/features/feature-embed-db/embed-db";
import { resolve } from "aurelia";

export class LibrariesView {
	private fileDialog = resolve(IFileDialog);
	private libraryService = resolve(LibraryService);
	private loadPromise: Promise<Map<string, Library>> | null = null;

	public async created() {
		console.log('LibrariesView created');
		if (!this.loadPromise) {
			this.loadPromise = this.libraryService.createTable().then(() => this.libraryService.getLibraries().then(libs => {
				console.log('Libraries loaded', libs);
				return libs;
			}));
		}
	}

	public get libraries(): Library[] { //Map<string, Library> | null {
		console.log('Getting libraries from cache', this.libraryService.getCache());
		return Array.from(this.libraryService.getCache().values());
	}

	private async clickImport() {
		// await this.embedDb.load();
		await this.libraryService.createTable();
		await this.libraryService.getLibraries();
		console.log('Import clicked');

		// Open a dialog
		const dir = await this.fileDialog.open({
			// const file = await open({
			multiple: false,
			directory: true,
		});
		console.log(dir);

		// Prints directory path or URI
		if (!dir) return;
		const name = dir.split(/[\/\\]/).pop() || dir;
		const library = this.libraryService.createLibrary(name, dir);
		await this.libraryService.addLibrary(library);
		const libraries = await this.libraryService.getLibraries();
		console.log(libraries);
	}
}
