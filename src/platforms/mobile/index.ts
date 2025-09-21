const modules = import.meta.glob('./**/*.ts', { eager: true });

// Collect all exports (could be classes, functions, etc.)
const components = Object.values(modules)
  .flatMap(mod => Object.values(mod));

// Export for registration
export default components;
