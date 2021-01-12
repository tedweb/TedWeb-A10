# Create project links so ui-root can connect to user-portal and family-stuff etc.
mklink /D C:\Projects\PersonalDev\TedWeb\ui\src\app\content\user-portal C:\Projects\PersonalDev\TedWeb\ui\user-portal

# TwuxComponents
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## App Creation
To generate and add a new app:
1) Create app directory:  mkdir 'src/app/content/<domain name>/<app name>'  (ex: mkdir src/app/content/acme/catalog)
2) Navigate to directory: cd 'src/app/content/<domain name>/<app_name>' (ex: cd src/app/content/<domain name>/<app name>
2) Create qpp module:     ng generate module <library module name> (ex: ng generate module catalog)
3) Create component(s):   ng generate component <component name> (ex: ng generate component home --module acme [--prefix acme])
4) Edit root app-routing.module.ts file to include new domain and app: 
   const routes: Routes = [
     ...
     {
       path: 'catalog',
       loadChildren: () => import('./content/acme/catalog/catalog.module#CatalogModule').then(m => m.ModuleName)
     },
     ...
   ];
5) Edit app's routing component to include new component:
   import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { Routes, RouterModule } from '@angular/router';
   import { SystemComponent } from './home/home.component';
   ...
   const routes: Routes = [
     { path: 'home', component: HomeComponent },
     ...
   ];
   ...
   @NgModule({
   imports: [
       CommonModule,
       ...
       RouterModule.forChild(routes)
     ],
     declarations: [
       HomeComponent,
       ...
     ]
   })
   export class CatalogModule { }
   
 # Links
 # Angular 7 Crud Tutorial: 
 # https://www.djamware.com/post/5bca67d780aca7466989441f/angular-7-tutorial-building-crud-web-application#ch3
