import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CommanService } from 'src/app/services/comman.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent {
  profileImageModel:boolean = false;
  isLoginValid:boolean = true;
  icon = {faClose}
  errorMessage:any;           // Contain error message.

  @Input() profileId:any;
  @Input() profileImg:any;

  @Input() userId:any;
  @Input() userImg:any;
  // @Output() userDetails = new EventEmitter<Object>();
  @Output() userDetails:EventEmitter<object> = new EventEmitter();

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService
  ){
    _modal.profileImageModal.subscribe((res) => {this.profileImageModel = res;});    
  }

  profileUploadModal(){
    this._modal.profileImageUploadModalOpen(false);
  }

  // file handling
  async selectFile(e:any){
    // get file details
    const file: File = e.target.files[0];
    // file did not come
    if(!file){ console.log('File not selected'); return;}

    // create new formData object
    const formData = new FormData();

    // convert file to html element
    const fileInput:HTMLInputElement | null = document.getElementById('file-upload') as HTMLInputElement;

    // file input come or not
    if(fileInput && fileInput.files && fileInput.files.length > 0){
      // append data in formData
      formData.append('userFile', fileInput.files[0]);
      formData.append('userId', this.profileId);

      // Call api for authorisation
      this._apiDataService.postApi('upload', {}, formData).subscribe({
        // next() method will be executed only when there will be no error
        next :(response:any) => {
          // On success.
          if(response.status === 'success'){
            // update @Input() form use image
            this.userImg = response.data.img;

            this.userDetails.emit(response.data);

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

