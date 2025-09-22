const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));
export default components;

// Common exports
export * from './app';
export * from '@/features/feature-ai/recognition';
