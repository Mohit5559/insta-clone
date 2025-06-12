import { Component, OnInit } from '@angular/core';
import { 
  faClapperboard, faUserAlt, 
  faBars} from '@fortawesome/free-solid-svg-icons';
import { faCompass, faSquarePlus,
 } from '@fortawesome/free-regular-svg-icons';
import { CommanService } from 'src/app/services/comman.service';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // profile details.
  userDetails:any;
  userImg:any;

  // Get data from sessionStorage.
  sessionData:any = sessionStorage.getItem('sessionStart');
  profileId:any = JSON.parse(this.sessionData)!.token;
  headers:any;

  icon = { faUserAlt, faClapperboard, faCompass, faSquarePlus, faBars};
  errorMessage:any; // Contain error message.

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService
  ){}

  ngOnInit():void{
    this.getProfileDetails();
  }

  getProfileDetails(){
    // Create headers for validating.
    this.headers = new HttpHeaders({
      'content-type':'application/json',
      'Authorization': `Bearer ${this.profileId}`
    });

    let recordData = {
      token: this.profileId
    };
    // console.log(recordData);
    
    // Call api for authorisation.
    this._apiDataService.postApi('/profile/details', this.headers, recordData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){
          this.userDetails = response.data.details[0];
          this.userImg = response.data.img;
        }else{
          // If api give fail result.
          if(response.status === 'fail'){
            this._toaster.toasterStatus(['error', response.msg]);
          }

          // If data null.
          if(response.status === 'fail' && response.data === null){
            // Call success toaster.
            this._toaster.toasterStatus(['error', response.msg]);
          }
        }
      }
    });
  }
  
  // open signup modal
  createModal(){
    this._modal.postModal(true);
  }

  // api call function.
  logout(){
    // Check session is set or not.
    if(this.sessionData){      
      // Remoe data from session storage.
      sessionStorage.clear();
      this._router.navigate(['/account']);
      return;
    }
  }

  // get user details.
  getProfile($event:any){
    this.userImg = $event.img;
    this.userDetails = $event.details[0];   
  }
}
