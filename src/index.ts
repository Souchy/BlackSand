
// Global views and components
const modules = import.meta.glob(['./views/**/*.ts', './components/**/*.ts'], { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));
export default components;

// Global features
export * from './features/feature-ai/recognition';
