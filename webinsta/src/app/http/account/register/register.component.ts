import { Component } from '@angular/core';
import { CommanService } from 'src/app/services/comman.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Register } from 'src/app/interface/auth.interface';
// Importing Router.
import { Router } from "@angular/router";
import { ApiDataService } from 'src/app/services/api-data.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerModel:boolean = false;
  isLoginValid:boolean = true;
  icon = {faClose, faCircleXmark, faCircleCheck}
  errorMessage:any;           // Contain error message.
  email:any;

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService
  ){
    _modal.modal.subscribe((res) => {this.registerModel = res;});
  }

  signUpModal(){
    this._modal.modalOpen(false);
  }

  // only email and number are allow
  emailOrNumberAllow(frm: AbstractControl) {
    let emlRgx = /^[^\s@A-Z]+@[^\s@A-Z0-9]+\.[^\s@A-Z0-9]+$/;
    let numRgx = /^[0-9]*$/;
       
   return ((emlRgx.test(frm.get('email')?.value) ) || (numRgx.test(frm.get('email')?.value))) ?
     null: {mismatch:true}
  } 

  // get data from the form
  registerForm = new FormGroup({
    // email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[0-9]*$') ])),
    email: new FormControl('', Validators.compose([Validators.required])),
    firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])),
    // firstName: new FormControl('', Validators.compose([Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.required])),
    userPass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
  }, {validators: this.emailOrNumberAllow});

  // check data and create user.
  userRegister(){    
    // Creating data for comparison.
    let registerData:Register = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      username: this.registerForm.value.firstName! + this.registerForm.value.lastName! + Math.round(Math.random() * 1000),
      password:this.registerForm.value.userPass!
    }
        
   // Call api for authorisation.
    this._apiDataService.postApi('account/register', {}, registerData).subscribe({
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
            this._toaster.toasterStatus(['error', response.msg + ' ' + response.error]);
          }
        }
      }
    });
  }
}
