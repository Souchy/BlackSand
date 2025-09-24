import { route } from '@aurelia/router';
import { HomeView } from './views/home-view/home-view';
import { IFileDialog } from '@/core/file-dialog';
import { inject, resolve } from 'aurelia';

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
  
    private fileDialog = resolve(IFileDialog);
  
    private async clickImport() {
      // Open a dialog
      const file = await this.fileDialog.open({
        // const file = await open({
        multiple: false,
        directory: false,
      });
      console.log(file);
      // Prints file path or URI
    }
}
