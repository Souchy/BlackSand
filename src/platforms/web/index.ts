import { IFileDialog } from "@/core/file-dialog";
import { PlatformRegistry } from "@/core/platform-registry";
import { Registration } from "aurelia";
import * as CommonRegistry from "@/platforms/common/index";
import { FileDialogWeb } from "./core/file-dialog-web";
import { WebClient } from "@/features/feature-web-client/web-client";

const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));
// export default components;

// Platform specific exports
// export * from './app';
export const registry: PlatformRegistry = CommonRegistry.registry
	// Components
	.withRegistrations([
		...components
	])
	// Features
	.withRegistrations([
		WebClient,
	])
	// Explicit registrations
	.withRegistrations([
		Registration.singleton(IFileDialog, FileDialogWeb),
	]);
