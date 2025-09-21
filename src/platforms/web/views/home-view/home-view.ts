import { IHomeView } from "@/platforms/common/views/home-view/home-view";
import { route } from "@aurelia/router";

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
