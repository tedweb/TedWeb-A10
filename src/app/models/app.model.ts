import { TwAngularNavModel } from "projects/tw-angular-nav/src/lib/tw-angular-nav.model";

export class AppModel {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: string;
  image: string;
  fontClass: string;
  version: string;
  page: string;
  menu: TwAngularNavModel;

  constructor() {
    this.id = "";
    this.name = "";
    this.path = "";
    this.description = "";
    this.icon = "";
    this.image = "";
    this.fontClass = "";
    this.version = "";
    this.page = "";
    this.menu = new TwAngularNavModel();
  }
}
