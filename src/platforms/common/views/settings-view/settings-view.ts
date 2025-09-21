import { route } from "@aurelia/router";

export interface ISettingsView {
}

@route({
  id: 'settings',
  path: ['', 'settings'],
  title: 'Settings',
  data: {
	i18n: 'routes:settings',
	// sidebar: OtherSide,
	icon: 'bi-house'
  }
})
export class SettingsView implements ISettingsView {
}
