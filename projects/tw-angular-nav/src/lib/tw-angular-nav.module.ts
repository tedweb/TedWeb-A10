import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";

import { TwAngularNavComponent } from './tw-angular-nav.component';
import { TwAngularNavitemComponent } from './tw-angular-navitem/tw-angular-navitem.component';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatIconModule
  ],
  declarations: [
    TwAngularNavComponent,
    TwAngularNavitemComponent
  ],
  exports: [
    TwAngularNavComponent
  ]
})
export class TwAngularNavModule { }
