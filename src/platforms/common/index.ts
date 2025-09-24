import { PlatformRegistry } from '@/core/platform-registry';
import { App } from './app';
import { Recognition } from '@/features/feature-ai/recognition';
import Aurelia from 'aurelia';

const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));

export const registry: PlatformRegistry = new PlatformRegistry()
	// Default App
	.withApp(App)
	// Components
	.withRegistrations([
		...components
	])
	// Features
	.withRegistrations([
		Recognition
	]);
