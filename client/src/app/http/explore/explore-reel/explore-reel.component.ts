import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { faBookmark, faComment, faHeart, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faClose, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CommanService } from 'src/app/services/comman.service';

@Component({
  selector: 'app-explore-reel',
  templateUrl: './explore-reel.component.html',
  styleUrls: ['./explore-reel.component.scss'],
  // standalone: true,
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExploreReelComponent {
  exploreReels:boolean = false;
  isLoginValid:boolean = true;
  icon = {faClose, faEllipsis, faHeart, faComment, faBookmark, faFaceSmile}
  errorMessage:any;           // Contain error message.

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService
  ){
    _modal.modal.subscribe((res) => {this.exploreReels = res;});
  }

  exploreReelModal(){
    this._modal.exploreModalOpen(false);
  }
}
