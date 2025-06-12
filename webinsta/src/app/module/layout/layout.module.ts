import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutRoutingModule } from 'src/app/routing/layout-routing.module';
import { LayoutComponent } from 'src/app/http/components/layout/layout.component';
import { SidebarComponent } from 'src/app/http/components/layout/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/http/components/layout/navigation/header/header.component';
import { FooterComponent } from 'src/app/http/components/layout/navigation/footer/footer.component';
import { NotFoundModule } from '../not-found.module';
import { ImageUploadModule } from '../image-upload.module';

@NgModule({
	declarations: [
		LayoutComponent,
		SidebarComponent,
		HeaderComponent,
		FooterComponent
  	],
  	imports: [
		CommonModule,
		LayoutRoutingModule,
		FontAwesomeModule,
		NotFoundModule,
		ImageUploadModule
	],
})
export class LayoutModule {}