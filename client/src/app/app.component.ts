import { Component } from '@angular/core';
import { Images } from 'src/data';
import {faSun, faMoon, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Instagram';
  images:any = Images;
  icon = {faSun, faMoon, faChevronLeft};
  themeDark:boolean =  false;

  // Chenge theme function.
  changeTheme(){
    document.querySelector('body')?.classList.toggle('dark-theme');
    this.themeDark = (this.themeDark === true) ? false : true;
  }
}
