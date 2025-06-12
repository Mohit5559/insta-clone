import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListModule } from './list.module';
import { PostratedComponent } from '../http/components/postrated/postrated.component';



@NgModule({
  declarations: [
    PostratedComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ListModule
  ],
  exports:[
    PostratedComponent
  ]
})
export class PostratedModule { }
