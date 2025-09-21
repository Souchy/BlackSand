import { route } from '@aurelia/router';
import { HomeView } from '@/platforms/common/views/home-view/home-view';

// const platform = process.env.TAURI_ENV_PLATFORM;
const platform = import.meta.env.VITE_IS_TAURI;
const isTauri = !!(window as any).__TAURI__ || !!(window as any).tauri;

@route({
  routes: [
    HomeView
  ],
  // fallback: import('./missing-page/missing-page'),
})
export class App {
  public message = 'Hello World!\n' + navigator.platform + "\n" + navigator.userAgent + "\n" + window["__TAURI__"] + "\n" + platform + "\n" + isTauri;
}
