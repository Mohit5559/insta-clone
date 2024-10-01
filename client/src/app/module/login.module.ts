import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RegisterModule } from './register.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRoutingModule } from '../routing/login-routing.module';
import { LoginComponent } from '../http/account/login/login.component';
import { ForgotComponent } from '../http/account/forgot/forgot.component';
import { ResetComponent } from '../http/account/reset/reset.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    RegisterModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class LoginModule { }
