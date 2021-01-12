import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home/home.component';
import { SystemComponent } from './system/system.component';
import { PerformComponent } from './perform/perform.component';
import { PopulationComponent } from './population/population.component';
import { ConditionRegistryComponent } from './condition_registry/conditionRegistry.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perform', component: PerformComponent },
  { path: 'population', component: PopulationComponent },
  { path: 'system', component: SystemComponent },
  { path: 'condition_registry', component: ConditionRegistryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    SystemComponent,
    PerformComponent,
    PopulationComponent,
    ConditionRegistryComponent
  ]
})
export class EdhAdminModule { }
