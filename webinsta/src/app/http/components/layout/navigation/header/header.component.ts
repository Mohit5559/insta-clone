import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faMagnifyingGlass, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icon = {faMagnifyingGlass, faHeart, faChevronDown, faUsers, faStar}
}
