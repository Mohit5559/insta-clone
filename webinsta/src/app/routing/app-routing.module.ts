import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/account',
    pathMatch:'full'
  },
  {
    path:'account',
    loadChildren: () => import('src/app/module/login.module').then((module)=>module.LoginModule),
  },{
    path:'',
    loadChildren: () => import('src/app/module/layout/layout.module').then((module) => module.LayoutModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
