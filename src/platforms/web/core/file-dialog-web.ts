import { IFileDialog } from "@/core/file-dialog";
import { OpenDialogOptions, OpenDialogReturn } from "@tauri-apps/plugin-dialog";

export class FileDialogWeb implements IFileDialog {
	async open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>> {
		console.log("FileDialogWeb.open", options);

		if (options?.directory) {
			const dirHandle = await (window as any).showDirectoryPicker();
			console.log("DirHandle: ", dirHandle);
		}
		else {
			// Open files
			const fileHandle = await (window as any).showOpenFilePicker();
			console.log("FileHandle: ", fileHandle);
		}

		return {} as OpenDialogReturn<T>;
	}
}
