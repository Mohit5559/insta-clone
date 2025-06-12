import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { CommanService } from 'src/app/services/comman.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  // Get data from sessionStorage.
  sessionData:any = sessionStorage.getItem('sessionStart');
  profileId:any = JSON.parse(this.sessionData)?.token;
  header:any;
  createModel:boolean = false;
  isLoginValid:boolean = true;
  icon = {faClose, faImage, faYoutube}
  errorMessage:any;           // Contain error message.

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService
  ){
    _modal.postModalData.subscribe((res) => {this.createModel = res;});
  }

  createModal(){
    this._modal.postModal(false);    
  }

  // file handling
  async selectPost(e:any){
    // get file details
    const file: File = e.target.files[0];
    // file did not come
    if(!file){ console.log('File not selected'); return;}

    // create new formData object
    const formData = new FormData();

    // convert file to html element
    const fileInput:HTMLInputElement | null = document.getElementById('post-upload') as HTMLInputElement;
    
    // file input come or not
    if(fileInput && fileInput.files && fileInput.files.length > 0){
      // append data in formData
      formData.append('userFile', fileInput.files[0]);
      formData.append('userId', this.profileId);

      // Call api for authorisation
      this._apiDataService.postApi('post/upload', {}, formData).subscribe({
        // next() method will be executed only when there will be no error
        next :(response:any) => {
          // On success.
          if(response.status === 'success'){
            this._toaster.toasterStatus(['success', response.msg]);
          }else{
            // If api give fail result
            if(response.status === 'fail'){
              this._toaster.toasterStatus(['error', response.msg]);
            }

            // If data null
            if(response.status === 'fail' && response.data === null){
              // Call success toaster
              this._toaster.toasterStatus(['error', response.msg]);
            }
          }
        }
      });
    }
  }
}
