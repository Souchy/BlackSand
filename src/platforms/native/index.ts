import { IFileDialog } from "@/core/file-dialog";
import { Registration } from "@aurelia/kernel";
import { FileDialogNative } from "./file-dialog-native";
import { EmbedDB } from "@/features/feature-embed-db/embed-db";
import { PlatformRegistry } from "@/core/platform-registry";
import * as CommonRegistry from "@/platforms/common/index";

const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));

export const registry: PlatformRegistry = CommonRegistry.registry
	// Components
	.withRegistrations([
		...components
	])
	// Features
	.withRegistrations([
		EmbedDB,
	])
	// Explicit registrations
	.withRegistrations([
		Registration.singleton(IFileDialog, FileDialogNative),
	]);
