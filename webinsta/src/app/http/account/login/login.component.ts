import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CommanService } from 'src/app/services/comman.service';
import { PhoneSlideImage } from 'src/data';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/interface/auth.interface';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Get data from sessionStorage.
  sessionData:any = sessionStorage.getItem('sessionStart');
  parseSessionData = JSON.parse(this.sessionData);

  // get images.
  images:any = PhoneSlideImage;
  errorMessage:any; // Contain error message.
  autoSlide = true;
  slideInterval = 5000;

  selectedIndex = 0;

  icon = {faCircleXmark, faCircleCheck};

  constructor(
    private _modal:CommanService,
    private _router:Router,
    private _apiDataService:ApiDataService,
    private _toaster:ToasterService,
  ){}

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }

    if(this.parseSessionData!){
      this._router.navigate(['/dashboard'])
    }
  }

  // Changes slide in every 3 seconds
  autoSlideImages():void{
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  // Slide move next slide automatic.
  onNextClick():void{
    if(this.selectedIndex === this.images.length - 1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }
  }

  // open signup modal
  signUpModal(){
    this._modal.modalOpen(true);
  }

  // only email and number are allow
  emailOrNumberAllow(frm: AbstractControl) {
    let emlRgx = /^[^\s@A-Z]+@[^\s@A-Z0-9]+\.[^\s@A-Z0-9]+$/;
    let numRgx = /^[0-9]*$/;
       
   return ((emlRgx.test(frm.get('userName')?.value) ) || (numRgx.test(frm.get('userName')?.value))) ?
     null: {mismatch:true}
  }

  // get data from the form
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.compose([Validators.required])),
    userPass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
  }, {validators: this.emailOrNumberAllow});

  // call facebook login api.
  facebookLogin(){
    // Call api for authorisation.
    window.location.href = `${environment.BACKEND_BASEURL}auth/facebook`;
  }
  
  // call google login api.
  googleLogin(){
    // Call api for authorisation.
    window.location.href = `${environment.BACKEND_BASEURL}auth/google`;
  }

  login() {

    // Creating data for comparison.
    let loginData:Login = {
      username: this.loginForm.value.userName!,
      password: this.loginForm.value.userPass!
    }

    // Call api for authorisation.
    this._apiDataService.postApi('account/login', {}, loginData).subscribe({
      // next() method will be executed only when there will be no error.
      next :(response:any) => {
        // On success.
        if(response.status === 'success'){          
          // Set session storage for privacy.
          sessionStorage.setItem('sessionStart', JSON.stringify(response.data));
          this._toaster.toasterStatus(['success', response.msg]);

          // Redirect on dashboard.
          this._router.navigate(['/dashboard']);

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


