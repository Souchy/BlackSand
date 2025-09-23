import { Registration } from 'aurelia';
import { registrations as NativeRegistrations } from '../native/index';
import { IFileDialog } from '@/core/file-dialog';
import { FileDialogDesktop } from './file-dialog-desktop';

const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));

// Platform specific exports
export const registrations = [
	...NativeRegistrations,
	...components,
	Registration.singleton(IFileDialog, FileDialogDesktop)
];
console.log("Desktop platform registrations:", registrations);

export { App } from './app';
