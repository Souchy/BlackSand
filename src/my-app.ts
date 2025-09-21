
// const platform = process.env.TAURI_ENV_PLATFORM;
const platform = import.meta.env.VITE_IS_TAURI;
const isTauri = !!(window as any).__TAURI__ || !!(window as any).tauri;

export class MyApp {
  public message = 'Hello World!\n' + navigator.platform + "\n" + navigator.userAgent + "\n" + window["__TAURI__"] + "\n" + platform + "\n" + isTauri;
}
