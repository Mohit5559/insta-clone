import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRoutingModule } from '../routing/login-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from '../http/account/register/register.component';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
