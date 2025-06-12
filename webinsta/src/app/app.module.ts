import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { ModalComponent } from './http/components/model/modal.component';
import { LoaderComponent } from './http/components/loader/loader.component';
import { ToasterComponent } from './http/components/toaster/toaster.component';
import { CreateModule } from './module/create.module';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoaderComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CreateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
