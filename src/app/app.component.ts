import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ActionModel } from './models/action.model';
import { AppModel } from './models/app.model';
import { ConfigModel } from './models/config.model';
import { BaseComponent } from './base/base.component';
import { TwAngularNavModel } from 'projects/tw-angular-nav/src/lib/tw-angular-nav.model';
import { TwAngularNavitemModel } from 'projects/tw-angular-nav/src/lib/tw-angular-navitem/tw-angular-navitem.model';
import { ConfigService } from './services/config.service';
import { CultureService } from './services/culture.service';
import { TwNavDirections } from 'projects/tw-angular-nav/src/lib/tw-angular-nav.enums';

@Component({
  selector: 'twx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'twx';
  culture: string = '';
  displayPage: string = '';
  displayFloatingNavMenu: boolean = false;
  menu: TwAngularNavModel;
  menuIsCollapsed: boolean = false;
  selectedApp: AppModel = new AppModel();
  version: string = "";
  pageName: string = "";
  minFullScreenWidth: number = 600;
  isFullScreen: boolean;
  hasAppSelected: boolean = true;
  navMinimize: boolean = false;
  navDirection: string = 'column';
  
  private readonly DefaultNavPanelWidth: string = "100px";
  private readonly DefaultNavPanelHeight: string = "50px";


  constructor(configService: ConfigService, cultureService: CultureService, private router: Router) {
    super(configService, cultureService);
    this.isFullScreen = window.innerWidth >= this.minFullScreenWidth;
  }

  onToggleNavDirection() {
    this.navDirection = this.navDirection == 'row' ? 'column' : 'row';
    // var menuCopy = JSON.parse(JSON.stringify(this.menu)) as TwAngularNavModel;
    // menuCopy.direction = menuCopy.direction == 'row' ? TwNavDirections.Column : TwNavDirections.Row;
    // this.menu = menuCopy;
  }


  onToggleNavMode() {
    this.navMinimize = !this.navMinimize;
  }

  protected onConfigLoaded(value: ConfigModel) {
    if (value) {
      this.culture = navigator.language ? navigator.language.substr(navigator.language.indexOf('-') + 1).toLowerCase() : "us";
      this.cultureService.get(this.culture);

      // This is executed AFTER dictionary is loaded/
      Promise.resolve(null).then(() => {
        var pathComponents = window.location.pathname.replace(/^\/+/g, '').split('/');
        var appName = pathComponents.length > 0 ? pathComponents[0] : '';
        var apps: AppModel[] = [];

        // Try to define current app by url link reference
        if (appName) {
          apps = this.config.apps.filter(val => {
            return val.path === appName;
          })
        }

        // Try to define current app config user's last know app uasage
        if (apps.length === 0 && this.config.user.app_id) {
          apps = this.config.apps.filter(val => {
            return val.id === this.config.user.app_id;
          });
        }

        // This prevents loading of root pages (e.g. home, signin, createaccount, etc.)
        // Try to define current app by defaulting to first available
        if (apps.length === 0) {
          apps = this.config.apps;
        }

        if (apps && apps.length > 0) {
          this.selectApp(apps[0].id);
        }

        var appSpecified: boolean = pathComponents.length > 1;
        var pageSpecified: boolean = pathComponents.length > 0;
        var pageName = "home";

        if (pageSpecified && appSpecified) {
          pageName = pathComponents[1];
        } else if (pageSpecified && !appSpecified) {
          pageName = pathComponents[0];
        }

        if (appSpecified) {
          this.hasAppSelected = true;
          this.loadAppPath(pageName);
        } else {
          this.loadRootPath(pageName);
        }

      });

    }
  }

  protected onCultureLoaded(value: any) {
    if (value && this.config.user.lang != this.translate('Culture')) {
      this.config.user.lang = this.translate('Culture');

      if (this.menu) {
        var menuCopy = JSON.parse(JSON.stringify(this.selectedApp.menu)) as TwAngularNavModel;
        this.loadMenuTranslations(menuCopy.items, this.selectedApp.menu.items);
        this.menu = menuCopy;
        this.status = this.translate('Ready');
      }
    }
  }

  onLangSelect(value: string) {
    console.log('Culture Change Request: ' + value);
    this.loadCulture(value);
  }

  onFloatNavMenuToggle() {
    this.displayFloatingNavMenu = !this.displayFloatingNavMenu;
  }

  onActionSelect(value: ActionModel) {
    if (value.name.toUpperCase() === 'SIGN OUT') {
      this.config.user = undefined;
      this.loadRootPath("home");
    }
    console.log('User action selected: ' + value.name);
  }

  onPageSelect(page: string) {
    this.loadRootPath(page);
    this.displayFloatingNavMenu = false;
  }

  onMenuSelect(menu: TwAngularNavitemModel) {
    setTimeout(() => {
      this.loadAppPath(menu.link);
      this.displayPage = menu.caption;
      this.displayFloatingNavMenu = false;
    });  
  }

  onCreateAccount() {
    this.loadRootPath('createaccount');
  }

  onSignIn() {
    this.loadRootPath('signIn');
  }

  onAppSelect(value: AppModel) {
    if (!this.selectedApp || this.selectedApp.id !== value.id) {
      this.displayPage = '';
      this.selectApp(value.id);
    }
  }

  get navPanelWidth(): string {
    if (this.menu && this.menu.buttonWidth) {
      return this.menu.buttonWidth;
    } else {
      return this.DefaultNavPanelWidth;
    }
  }

  // get navPanelHeight(): string {
  //   // if (this.menu && this.menu.buttonHeight) {
  //   //   return this.menu.buttonHeight;
  //   // } else {
  //   //   return this.DefaultNavPanelHeight;
  //   // }

  //   var result="0";
  //   if (this.menu.direction == 'row') {
  //     result = this.DefaultNavPanelHeight;
  //   } else {
  //     result = 'calc(100% - ' + this.DefaultNavPanelHeight + ')';
  //   }
  //   return result;
  // }

  get contentPaneHeight(): string {
    return 'calc(100% - ' + this.DefaultNavPanelHeight + ')';
  }


  private selectApp(id: string) {
    if (!id && this.config.apps.length > 0) {
      id = this.config.apps[0].id;
    }

    this.selectedApp = this.config.apps.filter(function (item) {
      return item.id === this;
    }, id)[0];

    if (this.selectedApp) {
      this.version = this.selectedApp.version;
      this.menu = this.selectedApp.menu;
      this.navMinimize = this.menu.minimize;
      this.loadAppPath(this.selectedApp.page ? this.selectedApp.page : 'home');

      if (this.config.user) {
        this.config.user.app_id = this.selectedApp.id;
      }
    } else {
      this.loadRootPath('home');
    }
  }

  private loadRootPath(page: string) {
    setTimeout(() => {
      this.selectedApp.page = '';
      this.router.navigateByUrl(page);
    });
  }

  private loadAppPath(page: string) {
    if (this.selectedApp.page !== page)
    {
      this.selectedApp.page = page;
      this.router.navigateByUrl(this.selectedApp.path + '/' + this.selectedApp.page);
    }
  }

  private loadCulture(value: string): void {
    if (this.config.user.lang !== value) {
      this.status = 'Loading culture...';
      this.cultureService.get(value);
    }
  }

  private loadMenuTranslations(targetItems: TwAngularNavitemModel[], sourceItems: TwAngularNavitemModel[]) {
    for (let i in targetItems) {
      targetItems[i].caption = this.translate(sourceItems[i].caption);
      this.loadMenuTranslations(targetItems[i].items, sourceItems[i].items);
    }
  }
  
  // public onMenuCollapsed(): void {
  //   this.menuIsCollapsed = true;
  // }
  
  // public onMenuExpanded(): void {
  //   this.menuIsCollapsed = false;
  // }
  
  // private findFirstMenuLink(items: TwAngularNavitemModel[]): string {
  //   var result = '';

  //   for (let i in items) {
  //     if (items[i].items.length > 0) {
  //       result = this.findFirstMenuLink(items[i].items);
  //     }
  //     else if (items[i].link && items[i].link !== '') {
  //       result = items[i].link;
  //     }

  //     if (result !== '') {
  //       break;
  //     }
  //   }

  //   return result;
  // }


  //protected onProfileLoaded(value: ConfigModel) {
  //  if (value) {
  //    if (value.menu && value.menu.items.length > 0) {
  //      this.menu = value.menu;

  //      // redirect to first page
  //      var targetPage: string = this.findFirstMenuLink(this.menu.items);
  //      if (targetPage !== '') {
  //        var role = this.config && this.config.user ? this.config.user.role : '';
  //        this.loadAppPath(targetPage, role);
  //      }
  //    }

  //    if (value.user) {
  //      this.config.user = value.user;

  //      if (this.config.user.lang && this.config.user.lang !== this.culture) {
  //        this.culture = this.config.user.lang;
  //        this.cultureService.get(this.culture);
  //      }
  //    }
  //  }
  //}

}
