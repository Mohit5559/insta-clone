import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from '../routing/profile-routing.module';
import { ListModule } from './list.module';
import { PostratedModule } from './postrated.module';
import { ImageUploadModule } from './image-upload.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from '../http/profile/profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    ListModule,
    PostratedModule,
    ImageUploadModule
  ]
})
export class ProfileModule { }
