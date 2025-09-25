
import { IFileDialog } from '@/core/file-dialog';
import { inject, resolve } from 'aurelia';

// @inject(IFileDialog)
export class App {
	private fileDialog = resolve(IFileDialog);

	// constructor(private fileDialog: IFileDialog) {
	// }

	private async clickImport() {
		// Open a dialog
		const file = await this.fileDialog.open({
			// const file = await open({
			multiple: false,
			directory: false,
		});
		console.log(file);
		// Prints file path or URI
	}

}
