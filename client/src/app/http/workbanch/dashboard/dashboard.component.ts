import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Get data from sessionStorage.
  sessionData:any = sessionStorage.getItem('sessionStart');
  profileId:any = JSON.parse(this.sessionData);
  url = environment.IMG_BASEURL;
  token:any = this.profileId.token;
  userId:any = this.profileId.user.id;
  headers:any;  // Store headers details.
  errorMessage:any; // Contain error message.
  responseData:any

  constructor(
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService
  ){}
  
  ngOnInit(): void {
    // Create headers for validating.
    this.headers = new HttpHeaders({
      'content-type':'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    // Call api for authorisation.
    this._apiDataService.getApi('home', this.headers).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){
          this._toaster.toasterStatus(['success', response.msg]);
          this.responseData = response.data;                    
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
  
  getHomeData(){
    // Call api for authorisation.
    this._apiDataService.getApi('home', this.headers).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){
          this._toaster.toasterStatus(['success', response.msg]);
          this.responseData = response.data;                    
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

  
  // Follow details update.
  userFollow(userId:any, followedId:any){
    // Creating data for comparison.
    let followData:any = {
      userId:userId,
      followedId:followedId
    }
   
    // Call api for authorisation.
    this._apiDataService.postApi('userFollow', this.headers, followData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        
        // On success.
        if(response.status === 'success'){          
          this._toaster.toasterStatus(['success', response.msg]);
          // this._router.navigate(['/dashboard']);
          this.getHomeData()
        }else{
          // If api give fail result.          
          if(response.status === 'fail'){
            this.errorMessage = response.data;
            this._toaster.toasterStatus(['error', response.msg]);
          }

          // If data null.
          if(response.status === 'fail' && response.data === null){
            // Call success toaster.
            this._toaster.toasterStatus(['error', response.msg + ' ' + response.error]);
          }
        }
      }
    });
  }
}
