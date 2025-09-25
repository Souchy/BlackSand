import { Registration } from 'aurelia';
import { registry as NativeRegistry } from '../native/index';
import { IFileDialog } from '@/core/file-dialog';
import { FileDialogDesktop } from './file-dialog-desktop';
import { PlatformRegistry } from '@/core/platform-registry';
import * as NativeRegistrations from '../native/index';
import { App } from './app';

const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));

export const registry: PlatformRegistry = NativeRegistrations.registry;
	// // Components
	// .withRegistrations([
	// 	...components,
	// ])
	// // Explicit registrations
	// .withRegistrations([
	// 	Registration.singleton(IFileDialog, FileDialogDesktop)
	// ])
	// // App
	// .withApp(App)

