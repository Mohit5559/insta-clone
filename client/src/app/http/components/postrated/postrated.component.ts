import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { CommanService } from 'src/app/services/comman.service';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-postrated',
  templateUrl: './postrated.component.html',
  styleUrls: ['./postrated.component.scss']
})
export class PostratedComponent {
  friendsModel:boolean = false;
  isLoginValid:boolean = true;
  icon = {faClose, faImage, faYoutube, faMagnifyingGlass}
  errorMessage:any;           // Contain error message.
  followers:any = [];

  // Decorator variable parent to child.
  @Input() data:any;
  
  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService
  ){
    _modal.friendsModal.subscribe((res) => {this.friendsModel = res;});
    _modal.followersData.subscribe((data) => {this.followers= data;});
    
  }

  friendsModal(){
    this._modal.friendsOpen(false);
  }
}
