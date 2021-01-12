import { Component, EventEmitter, Output, Input } from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { ConfigService } from '../services/config.service';
import { CultureService } from '../services/culture.service';
import { ConfigModel } from '../models/config.model';
import { CultureModel } from '../models/culture.model';

@Component({
  selector: 'tw-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss'
  ]
})
export class FooterComponent extends BaseComponent {
  _version: string = '';
  _flag_abbr: string;
  year: number = new Date().getFullYear();
  @Output() langSelect = new EventEmitter<string>();


  get version(): string {
    return this._version;
  }

  @Input() set version(value: string) {
    this._version = value;
  }

  get flag(): string {
    return 'flag-icon flag-icon-' + this._flag_abbr;
  }

  @Input() set flag(value: string) {
    this._flag_abbr = value;
  }

  constructor(configService: ConfigService, cultureService: CultureService) {
    super(configService, cultureService);
  }

  onConfigLoaded(value: ConfigModel): any {
    if (value) {
      this.setCulture(value.user.lang);
    }
  }

  protected onCultureLoaded(value: any) {
    // to be overridden by derived classes...
    //this.setCulture(value.abbr);
  }


  onLangSelect(value: CultureModel) {
    this.setCulture(value.abbr);
    this.langSelect.emit(value.abbr);
  }

  setCulture(value: string) {
    if (value) {
      this.flag = value;
    }
  }

}
