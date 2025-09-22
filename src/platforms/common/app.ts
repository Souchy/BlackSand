import { route } from '@aurelia/router';
import { HomeView } from './views/home-view/home-view';

// const platform = process.env.TAURI_ENV_PLATFORM;
const isTauri = import.meta.env.VITE_IS_TAURI;

@route({
  routes: [
    HomeView
  ],
  // fallback: import('./missing-page/missing-page'),
})
export class App {
  isDev = import.meta.env.VITE_IS_DEBUG;
  public message = 'Hello World!\n' + navigator.platform + "\n" + navigator.userAgent + "\n" + isTauri;
}
