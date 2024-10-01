import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardRoutingModule } from '../routing/dashboard-routing.module';
import { ListModule } from './list.module';
import { DashboardComponent } from '../http/workbanch/dashboard/dashboard.component';
import { ReelsModule } from '../module/reels.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ListModule,
    ReelsModule
  ]
})
export class DashboardModule { }
