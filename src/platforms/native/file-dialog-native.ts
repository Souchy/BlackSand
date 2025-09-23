import { IFileDialog } from "@/core/file-dialog";
import { open, OpenDialogOptions, OpenDialogReturn } from "@tauri-apps/plugin-dialog";

export class FileDialogNative implements IFileDialog {
	async open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>> {
		console.log("FileDialogNative.open", options);
		return open(options);
	}
}
