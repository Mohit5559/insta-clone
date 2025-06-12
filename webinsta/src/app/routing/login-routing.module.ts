import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../http/account/login/login.component';
import { RegisterComponent } from '../http/account/register/register.component';
import { ForgotComponent } from '../http/account/forgot/forgot.component';
import { ResetComponent } from '../http/account/reset/reset.component';
import { AuthCallbackComponentComponent } from '../http/account/auth-callback-component/auth-callback-component.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'auth/callback',
    component: AuthCallbackComponentComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'forgot',
    component: ForgotComponent
  },
  {
    path:'reset/:email',
    component: ResetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
