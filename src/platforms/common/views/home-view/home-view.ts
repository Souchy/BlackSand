import { route } from "@aurelia/router";

export interface IHomeView {
}

@route({
  id: 'home',
  path: ['', 'home'],
  title: 'Home',
  data: {
    i18n: 'routes:home',
    // sidebar: OtherSide,
    icon: 'bi-house'
  }
})
export class HomeView implements IHomeView {
}
