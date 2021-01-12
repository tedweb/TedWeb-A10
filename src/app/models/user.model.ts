import { ActionModel } from './action.model';

export class UserModel {
  id: string;
  app_id: string;
  name: string;
  lang: string;
  actions?: ActionModel[];

  constructor() {
    this.id = "";
    this.app_id = "";
    this.name = "";
    this.lang = "";
    this.actions = [];
  }
}
