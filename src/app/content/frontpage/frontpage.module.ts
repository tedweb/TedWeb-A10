import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { HomeComponent } from './home/home.component';
//import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutComponent } from './about/about.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { FaqComponent } from './faq/faq.component';
import { InstallationComponent } from './installation/installation.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SetupComponent } from './setup/setup.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'configuration',
    component: ConfigurationComponent
  },
  {
    path: 'createaccount',
    component: CreateaccountComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'installation',
    component: InstallationComponent
  },
  {
    path: 'newsfeed',
    component: NewsfeedComponent
  },
  {
    path: 'setup',
    component: SetupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }//,
  //{
  //  path: '**',
  //  component: PagenotfoundComponent
  //}
];


@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    //PagenotfoundComponent,
    AboutComponent,
    ConfigurationComponent,
    CreateaccountComponent,
    FaqComponent,
    InstallationComponent,
    NewsfeedComponent,
    SetupComponent,
    SigninComponent
  ]
})
export class FrontpageModule { }
