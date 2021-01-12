import { CultureModel } from "./culture.model";
import { UserModel } from "./user.model";
import { AppModel } from "./app.model";

export class ConfigModel {
  company: string;
  company_logo: string;
  tagline: string;
  apps: AppModel[];
  app_id: string;
  user: UserModel;
  langs: CultureModel[];
  api: string;

  constructor() {
    this.company = "";
    this.company_logo = "";
    this.tagline = "";

    this.user = new UserModel();
    this.apps = [];
    this.langs = [];
    this.api = '';
  }
}
