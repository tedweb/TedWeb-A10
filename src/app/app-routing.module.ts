import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './content/frontpage/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./content/frontpage/frontpage.module').then(m => m.FrontpageModule)
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];


@NgModule({
  declarations: [
    PagenotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
