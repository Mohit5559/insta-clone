import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent {
  icon = {faHeart}
  @Input() data:any;
  url = environment.IMG_BASEURL;
}
