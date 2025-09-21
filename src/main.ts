import Aurelia, { } from 'aurelia';
import { RouterConfiguration, Transition } from '@aurelia/router';
import { MyApp } from './my-app';
import { I18N, I18nConfiguration } from '@aurelia/i18n';
import Fetch from 'i18next-fetch-backend';
import * as SouchyAu from 'souchy.au'

const platformModuleMap: Record<string, string> = {
  web: './platforms/web/index.ts',
  windows: './platforms/desktop/index.ts',
  macos: './platforms/desktop/index.ts',
  linux: './platforms/desktop/index.ts',
  android: './platforms/mobile/index.ts',
  ios: './platforms/mobile/index.ts'
};

const au = new Aurelia();
let i18n: I18N | null = null;

// Components
au.register(SouchyAu);
// Platform specific
const platformModulePath = platformModuleMap[import.meta.env.VITE_PLATFORM];
if (platformModulePath) {
  const platformModule = await import(/* @vite-ignore */  platformModulePath);
  au.register(platformModule);
}


// I18N
// au.register(
//   I18nConfiguration.customize((options) => {
//     options.initOptions = {
//       // debug: true,
//       plugins: [Fetch],
//       backend: {
//         loadPath: './i18n/{{lng}}/{{ns}}.json',
//       },
//       // defaultNS: 'routes'
//       ns: ['routes', 'common'],
//       lng: 'fr',
//     };
//   }),
// );

// Router
au.register(RouterConfiguration.customize({
  useNavigationModel: true,
  useUrlFragmentHash: false,
  activeClass: "toggled",
  // buildTitle(tr: Transition) {
  //   // Use the I18N to translate the titles using the keys from data.i18n.
  //   i18n ??= au.container.get(I18N);
  //   // const root = tr.routeTree.root;
  //   const child = tr.routeTree.root.children[0];
  //   return `${i18n.tr(child.data.i18n as string)}`;
  // },
}));

// Start application
await au.app(MyApp)
  .start();
