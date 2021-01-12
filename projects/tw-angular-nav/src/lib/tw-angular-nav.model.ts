import { TwAngularNavitemModel } from './tw-angular-navitem/tw-angular-navitem.model';
import { TwNavDirections } from './tw-angular-nav.enums';

export class TwAngularNavModel {
  autoShrinkMenusItems: boolean;
  lockSelectMenuItems: boolean;
  minimize: boolean;
  direction: TwNavDirections;
  buttonWidth: string;
  buttonHeight: string;
  items: TwAngularNavitemModel[];

  constructor() {
    this.autoShrinkMenusItems = true;
    this.lockSelectMenuItems = true;
    this.minimize = false;
    this.direction = TwNavDirections.Column;
    this.items = [];
    this.buttonWidth = "auto";
    this.buttonHeight = "auto";
  }
}
