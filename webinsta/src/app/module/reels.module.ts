import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReelsRoutingModule } from '../routing/reels-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommentsListComponent } from '../http/components/comments-list/comments-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExploreReelComponent } from '../http/explore/explore-reel/explore-reel.component';
import { ReelsComponent } from '../http/reels/reels.component';

@NgModule({
  declarations: [
    ReelsComponent,
    CommentsListComponent,
    ExploreReelComponent
  ],
  imports: [
    CommonModule,
    ReelsRoutingModule,
    SlickCarouselModule,
    FontAwesomeModule
  ],
  exports:[ReelsComponent],
})
export class ReelsModule { }
