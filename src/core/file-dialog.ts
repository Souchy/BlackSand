import { OpenDialogOptions, OpenDialogReturn } from "@tauri-apps/plugin-dialog";

export const IFileDialog = Symbol('IFileDialog');
export interface IFileDialog {
	// declare function open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>>;
	open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>>;
}
