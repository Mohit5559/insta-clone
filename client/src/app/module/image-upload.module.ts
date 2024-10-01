import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageUploadComponent } from '../http/components/image-upload/image-upload.component';



@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    ImageUploadComponent
  ]
})
export class ImageUploadModule { }
