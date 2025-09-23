import { IFileDialog } from "@/core/file-dialog";
import { Registration } from "@aurelia/kernel";
import { FileDialogNative } from "./file-dialog-native";
import { EmbedDB } from "@/features/feature-embed-db/embed-db";

const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));

export const registrations = [
	...components,
	Registration.singleton(IFileDialog, FileDialogNative),
	EmbedDB
];

console.log("Native platform registrations:", registrations);
