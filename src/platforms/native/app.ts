
import { IFileDialog } from '@/core/file-dialog';
import { inject, resolve } from 'aurelia';

// @inject(IFileDialog)
export class App {
	private fileDialog = resolve(IFileDialog);

	// constructor(private fileDialog: IFileDialog) {
	// }
	constructor() {
	}


}
