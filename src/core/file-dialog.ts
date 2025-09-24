import { OpenDialogOptions, OpenDialogReturn } from "@tauri-apps/plugin-dialog";
import { DI } from "aurelia";

export const IFileDialog = DI.createInterface<IFileDialog>();
export interface IFileDialog {
	open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>>;
}
