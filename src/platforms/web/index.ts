const modules = import.meta.glob(['./components/**/*.ts', './views/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));
export default components;

// Platform specific exports
// export * from './app';
export * from '@/features/feature-web-client/web-client';
