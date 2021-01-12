import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LambdasComponent } from './lambdas/lambdas.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemComponent } from './system/system.component';
import { CloudFormationComponent } from './cloudformation/cloudformation.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ReportsComponent } from './reports/reports.component';
import { TasksComponent } from './tasks/tasks.component';
import { BlogSampleComponent } from './lambdas/blog-sample/blog-sample.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'cloudformation', component: CloudFormationComponent },
  { path: 'campaigns', component: CampaignsComponent },
  { path: 'system', component: SystemComponent },
  { path: 'enterprise', component: EnterpriseComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'lambdas', component: LambdasComponent },
  { path: 'lambdas/blog-sample', component: BlogSampleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LambdasComponent,
    HomeComponent,
    SettingsComponent,
    SystemComponent,
    CloudFormationComponent,
    EnterpriseComponent,
    CampaignsComponent,
    MonitorComponent,
    ReportsComponent,
    TasksComponent,
    BlogSampleComponent
  ]
})
export class UserPortalModule { }

