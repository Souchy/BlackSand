const modules = import.meta.glob('./**/*.ts', { eager: true });
const components = Object.values(modules).flatMap(mod => Object.values(mod));
export default components;

export * from '@/features/feature-embed-db/embed-db';
