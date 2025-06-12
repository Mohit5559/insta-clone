import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../validation/auth.guard';
import { LayoutComponent } from '../http/components/layout/layout.component';
import { NotFoundComponent } from '../http/components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
      },
      {
        path:'',
        loadChildren: () => import('src/app/module/dashboard.module').then((module) => module.DashboardModule),
        canActivate:[authGuard]
      },
      {
        path:':email',
        loadChildren: () => import('src/app/module/profile.module').then((module) => module.ProfileModule),
        canActivate:[authGuard]
      },
      {
        path:':**',
        component:NotFoundComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
