import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReelsRoutingModule } from '../routing/reels-routing.module';
import { ReelsComponent } from '../http/reels/reels.component';
import { CommentsListComponent } from '../http/components/comments-list/comments-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExploreReelComponent } from '../http/explore/explore-reel/explore-reel.component';

@NgModule({
  declarations: [
    ReelsComponent,
    CommentsListComponent,
    ExploreReelComponent
  ],
  imports: [
    CommonModule,
    ReelsRoutingModule,
    FontAwesomeModule
  ],
  exports:[ReelsComponent],
})
export class ReelsModule { }
