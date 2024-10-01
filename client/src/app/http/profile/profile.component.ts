import { Component, OnInit } from '@angular/core';
import { faPlus, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanService } from 'src/app/services/comman.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  headers:any;  // Store headers details.
  icon = {faPlus, faTableCells };
  errorMessage:any; // Contain error message.
  friendsData:any = [];
  token:any;
  userDetails:any;
  userImg:any;
  userId:any;

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService,
  ){}

  ngOnInit():void{
    this.token = this._route.snapshot.paramMap.get('email');
    this.getProfile()
  }

  getProfile(){
    // Create headers for validating.
    this.headers = new HttpHeaders({
      'content-type':'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let recordData = {
      token: this.token
    };

    // Call api for authorisation.
    this._apiDataService.postApi('/profile/details', this.headers, recordData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){          
          this.userDetails = response.data.details[0];
          this.userId = response.data.details[0]?.id;
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

  // this function gets data from child(which is image-upload component) with help of @Output method
  getUserDetails($event:any){
    this.userImg = $event.img;
    this.userDetails = $event.details[0];
  }

  // open post create modal
  createModal(){
    this._modal.postModal(true);
  }

  // open followers modal
  friendsModal(arg1:any){
    if(arg1 === "followers"){
      this.friendsData = {title:'Followers', heading:'Followers', text:"You'll see all the people who follow you here."}
    }else{
      this.friendsData = {title:'Following', heading:'People you follow', text:"Once you follow people, you'll see them here."}
    }
    this._modal.friendsOpen(true);
    this._modal.setFollowersData(this.friendsData);
  }

  // profile image upload.
  profileImage(){
    this._modal.profileImageUploadModalOpen(true);
  }
}
