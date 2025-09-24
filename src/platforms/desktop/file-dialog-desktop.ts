import { open, OpenDialogOptions, OpenDialogReturn } from "@tauri-apps/plugin-dialog";
import { FileDialogNative } from "../native/file-dialog-native";

export class FileDialogDesktop extends FileDialogNative {
	async open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>> {
		console.log("FileDialogDesktop.open", options);
		return open(options);
	}
}
