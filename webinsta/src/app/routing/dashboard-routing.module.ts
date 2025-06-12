import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../http/workbanch/dashboard/dashboard.component';
import { ExploreComponent } from '../http/explore/explore.component';
import { ExploreReelComponent } from '../http/explore/explore-reel/explore-reel.component';
import { ReelsComponent } from '../http/reels/reels.component';
import { authGuard } from '../validation/auth.guard';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[authGuard]
    
  },  
  {
    path:'explore',
    children:[    
      {path:'', component:ExploreComponent,},
      {
        path:':id',
        component:ExploreReelComponent
      },
    ]
  },
  {
    path:'reel',
    component:ReelsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
