import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TwAngularNavModule } from 'projects/tw-angular-nav/src/lib/tw-angular-nav.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    TwAngularNavModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],  
  entryComponents: [
  ]
})
export class AppModule { }
