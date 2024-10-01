import { Component} from '@angular/core';
import { faBookmark, faComment, faHeart, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faClose, faEllipsis, faLocationDot, faMusic, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanService } from 'src/app/services/comman.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

// declaire here javascript file function.
declare function videoPlayer(event:any, id:any):any;

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.scss'],
})

export class ReelsComponent {// Get data from sessionStorage.
  icon = {faBookmark, faComment, faClose, faEllipsis,faHeart, faMusic, faLocationDot, faFaceSmile, faPlay, faPause}
  sessionData:any = sessionStorage.getItem('sessionStart');
  profileId:any = JSON.parse(this.sessionData);
  token:any = this.profileId.token;
  userId:any = this.profileId.user.id;
  profileImg:any = this.profileId.user.picture;
  postDetails:any;
  url = environment.IMG_BASEURL; // Create url for the images.
  headers:any;  // Store headers details.
  errorMessage:any; // Contain error message.
  friendsData:any = [];
  autoPlay:boolean = false;

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService,
  ){}

  ngOnInit():void{
    // Create headers for validating.
    this.headers = new HttpHeaders({
      'content-type':'application/json',
      'Authorization': `Bearer ${this.token}`
    });  

    this.getAllLikes();
  }

  getAllLikes(){
    let recordData = {
      token: this.token
    };  

    // Call api for authorisation.
    this._apiDataService.postApi('/userPost', this.headers, recordData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){
          this.postDetails = response.data;
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

  // post like.
  postLike(userId:any, postId:any){
    // Creating data for comparison.
    let likeData:any = {
      userId:userId,
      postId:postId
    }
    
    // Call api for authorisation.
    this._apiDataService.postApi('userLike', this.headers, likeData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        
        // On success.
        if(response.status === 'success'){          
          this._toaster.toasterStatus(['success', response.msg]);

          //call function for update data.
          this.getAllLikes();

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

  // Comment on post.
  postOnComment(e:any, postId:any, userId:any){
    // Creating data for comparison.
    let likeData:any = {
      userId:userId,
      postId:postId,
      thought:e.target.value
    }
    
    // Call api for authorisation.
    this._apiDataService.postApi('userComment', this.headers, likeData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        
        // On success.
        if(response.status === 'success'){          
          this._toaster.toasterStatus(['success', response.msg]);

          //call function for update data.
          this.getAllLikes();

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

  // Follow details update.
  userFollow(userId:any, followedId:any){
    // Creating data for comparison.
    let followData:any = {
      userId:userId,
      followedId:followedId
    }

    console.log(followData);
    
    
    // Call api for authorisation.
    this._apiDataService.postApi('userFollow', this.headers, followData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        
        // On success.
        if(response.status === 'success'){          
          this._toaster.toasterStatus(['success', response.msg]);

          //call function for update data.
          this.getAllLikes();

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
  
  // call javascript file's function.
  videoPlay(event:any, postId:any){
    videoPlayer(event, postId);
  }
}
