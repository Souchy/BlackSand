import Aurelia, { LoggerConfiguration, LogLevel } from 'aurelia';
import { RouterConfiguration, Transition } from '@aurelia/router';
import { I18N, I18nConfiguration } from '@aurelia/i18n';
import Fetch from 'i18next-fetch-backend';
import * as SouchyAu from 'souchy.au'
import * as commonModule from './platforms/common/index';
import * as platformModule from '@platform';

const isDev = import.meta.env.VITE_IS_DEBUG;
const platformName = import.meta.env.VITE_PLATFORM;

const au = new Aurelia();

au.register(LoggerConfiguration.create({
  level: isDev ? LogLevel.debug : LogLevel.info,
  colorOptions: isDev ? 'colors' : 'no-colors'
}));

// Libs
au.register(SouchyAu);

// Components
let modules: {} = commonModule;
let app: any = platformModule.App ?? commonModule.App;

// Merge common and platform modules, platform overrides common
let commonExports = Object.values(commonModule).flat();
let platformExports = Object.values(platformModule).flat();

const tag = (c: any) => c?.name;
const map = new Map(commonExports.map(c => [tag(c), c]))
for (const c of platformExports) {
  const ctag: string = tag(c);
  if (isDev && map.has(ctag))
    console.log(`Override module '${ctag}':`, map.get(ctag), "->", c)
  map.set(ctag, c);
}
modules = Array.from(map.values())
au.register(modules);

if (isDev) {
  console.log("Dev Mode");
  console.log("Platform: ", platformName);
  console.log("Modules: ", modules);
  console.log("App: ", app);
}

// I18N
let i18n: I18N | null = null;
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
await au.app(app)
  .start();
