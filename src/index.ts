// Import all .ts files under views/, EXCLUDING any under platforms/
const modules = import.meta.glob([
  './**/*.ts',
  '!../platforms/**/*.ts' // Exclude all ts under platforms/
], { eager: true });

// Gather all named exports (classes, functions, etc.) from each module
const components = Object.values(modules)
  .flatMap(mod => Object.values(mod));

// Export array for easy registration
export default components;
