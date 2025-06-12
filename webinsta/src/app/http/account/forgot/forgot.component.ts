import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Forget } from 'src/app/interface/auth.interface';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CommanService } from 'src/app/services/comman.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  errorMessage:any; // Contain error message.
  icon = {faCircleXmark, faCircleCheck};

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService,
  ){}
  
  // open signup modal
  signUpModal(){
    this._modal.modalOpen(true);
  }

  // get data from the form
  forgetForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
  });

  // check data and create user.
  forget(){
    // Creating data for comparison.
    let forgetData:Forget = {
      email: this.forgetForm.value.email!
    }
    
    // Call api for authorisation.
    this._apiDataService.postApi('account/forgot', {}, forgetData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){
          
          this._toaster.toasterStatus(['success', response.msg]);

          // Redirect on dashboard.
          this._router.navigate(['/account']);

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
}
