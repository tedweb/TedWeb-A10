import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { ConfigService } from '../services/config.service';
import { CultureService } from '../services/culture.service';
import { ActionModel } from '../models/action.model';
import { AppModel } from '../models/app.model';
import { ConfigModel } from '../models/config.model';

@Component({
  selector: 'tw-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent extends BaseComponent {
  _selectedPage: string = '';
  pageHeader: string = '';
  _selectedApp: AppModel = new AppModel();
  tagline: string = '';
  userId: string = '';
  userName: string = '';
  userActions: ActionModel[] = [];
  userActionsMstr: ActionModel[] = [];
  enableApps: boolean = true;
  @Output() appSelect = new EventEmitter<AppModel>();
  @Output() actionSelect = new EventEmitter<ActionModel>();
  @Output() homeSelect = new EventEmitter();
  @Output() floatNavMenu = new EventEmitter();
  @Output() createAccount = new EventEmitter();
  @Output() signIn = new EventEmitter();

  get selectedPage(): string {
    return this._selectedPage;
  }

  @Input() set selectedPage(value: string) {
    if (value !== undefined) {
      this._selectedPage = value;
      this.pageHeader = this.cultureService.translate(value);
    }
  }

  constructor(configService: ConfigService, cultureService: CultureService) {
    super(configService, cultureService);
  }

  get selectedApp(): AppModel {
    return this._selectedApp;
  }

  @Input() set selectedApp(value: AppModel) {
    this._selectedApp = value;
  }

  ngOnInit() {
    this.selectedPage = '';
  }

  protected onConfigLoaded(value: ConfigModel) {
    if (value) {
      this.tagline = this.cultureService.translate(this.config.tagline);
    }
  }

  onProfileLoaded(value: any): any {
    if (value && value.user) {
      this.userId = value.user.id;
      this.userName = value.user.name;
      this.enableApps = value.user.apps.length > 1;
      for (let action of value.user.actions) {
        this.userActions.push(action);
      }
      this.userActionsMstr = this.userActions;
    }
  }

  onProfileUnloaded(): any {
    this.userId = undefined;
    this.userName = undefined;
    this.enableApps = false;
    this.userActions = [];
    this.userActionsMstr = null;
  }

  onCultureLoaded(value: any): any {
    if (value) {
      var menuCopy = JSON.parse(JSON.stringify(this.userActionsMstr)) as ActionModel[];
      this.translateMenuItems(menuCopy, this.userActionsMstr);
      this.tagline = this.cultureService.translate(this.config.tagline);
      this.pageHeader = this.cultureService.translate(this.selectedPage);
      this.userActions = menuCopy;
    }
  }

  onAppSelect(app: AppModel) {
    this.appSelect.emit(app);
  }

  onActionSelect(action: ActionModel) {
    this.actionSelect.emit(action);
  }

  onHome() {
    this.homeSelect.emit('home');
  }

  onFloatNavMenu(type: string) {
    this.floatNavMenu.emit();
  }

  onCreateAccount() {
    this.createAccount.emit();
  }

  onSignIn() {
    this.signIn.emit();
  }

  private translateMenuItems(targetItems: ActionModel[], sourceItems: ActionModel[]) {
    for (let i in targetItems) {
      targetItems[i].name = this.translate(sourceItems[i].name);
    }
  }

  graphicType(app: AppModel): string {
    if (app.icon) {
      return 'icon';
    } else if (app.image) {
      return 'image';
    } else if (app.fontClass) {
      return 'font'
    } else {
      return undefined;
    }
  }


}
