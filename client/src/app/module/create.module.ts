import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateComponent } from '../http/create/create.component';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    CreateComponent
  ]
})
export class CreateModule { }
