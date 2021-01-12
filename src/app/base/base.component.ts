import { Input, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfigService } from "../services/config.service";
import { CultureService } from "../services/culture.service";
import { ConfigModel } from "../models/config.model";

@Directive()
export class BaseComponent {
  configLoadedSubscription: Subscription;
  profileLoadedSubscription: Subscription;
  profileUnloadedSubscription: Subscription;
  cultureLoadedSubscription: Subscription;
  _status: string = '';
  _config: ConfigModel = new ConfigModel();

  constructor(protected configService: ConfigService, protected cultureService: CultureService) {
    if (configService) {
     this.configLoadedSubscription = this.configService.configLoaded.subscribe(item => {
       this.onHandleConfigLoaded(item);
     });

    // this.profileLoadedSubscription = this.configService.profileLoaded.subscribe(item => {
    //   this.onHandleProfileLoaded(item);
    // });

    // this.profileUnloadedSubscription = this.configService.profileUnloaded.subscribe(item => {
    //   this.onHandleProfileUnloaded();
    // });
    }

    if (cultureService) {
      this.cultureLoadedSubscription = this.cultureService.load.subscribe(item => {
        this.onHandleCultureLoaded(item);
      });
    }
  }

  ngOnDestroy() {
    this.configLoadedSubscription.unsubscribe();
    this.cultureLoadedSubscription.unsubscribe();
  }


  get status(): string {
    return this._status === '' ? 'Ready' : this._status;
  }

  @Input() set status(value: string) {
    this._status = value;
  }


  get config(): ConfigModel {
    return this._config;
  }

  @Input() set config(value: ConfigModel) {
    this._config = value;
    //this.onHandleConfigLoaded(this._config);
  }


  private onHandleConfigLoaded(value: ConfigModel) {
    if (value) {
      this.config = value;
      this.onConfigLoaded(value);
    }
  }

  // private onHandleProfileLoaded(value: ConfigModel) {
  //   // to be overridden by derived classes...
  //   if (value) {
  //     this.onProfileLoaded(value);
  //   }
  // }

  // private onHandleProfileUnloaded() {
  //   // to be overridden by derived classes...
  //   this.onProfileUnloaded();
  // }

  private onHandleCultureLoaded(value: any) {
    // to be overridden by derived classes...
    if (value) {
      this.onCultureLoaded(value);
    }
  }

  protected onConfigLoaded(value: ConfigModel) {
    // to be overridden by derived classes...
  }

  protected onProfileLoaded(value: ConfigModel) {
    // to be overridden by derived classes...
  }

  protected onProfileUnloaded() {
    // to be overridden by derived classes...
  }

  protected onCultureLoaded(value: any) {
    // to be overridden by derived classes...
  }

  protected translate(value: string): string {
    var result = value;
    if (this.cultureService) {
      result = this.cultureService.translate(value);
    }
    return result;
  }

}
