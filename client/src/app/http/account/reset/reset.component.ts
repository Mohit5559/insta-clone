import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanService } from 'src/app/services/comman.service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Reset } from 'src/app/interface/auth.interface';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  public email:any;
  registerModel:boolean = false;
  isLoginValid:boolean = true;
  errorMessage:any; // Contain error message.
  icon = {faCircleXmark, faCircleCheck};

  constructor(
    private route: ActivatedRoute,
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService,
  ) {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  // open signup modal
  signUpModal(){
    this._modal.modalOpen(true);
    return;
  }

  // password and confirm password match or not
  pwdConfirmMatch(frm: AbstractControl) {
    return frm.get('userPass')?.value === frm.get('conPass')?.value
       ? null : {'mismatch': true};
  }

  // get data from the form
  resetForm = new FormGroup({
    userPass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    conPass: new FormControl('', Validators.compose([Validators.required]))
  }, {validators: this.pwdConfirmMatch});

  // check data and create user.
  passwordReset(){
    // Creating data for comparison.
    let resetData:Reset = {
      password: this.resetForm.value.userPass!,
      email: this.email
    }
    
    // Call api for authorisation.
    this._apiDataService.postApi('account/reset', {}, resetData).subscribe({
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
            this.errorMessage = response.data;
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
