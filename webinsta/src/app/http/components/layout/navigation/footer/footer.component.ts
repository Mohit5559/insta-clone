import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCompass, faSquarePlus, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faClapperboard, faHome, faRightFromBracket, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CommanService } from 'src/app/services/comman.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  	// profile details.
	userDetails:any;
	userImg:any;
  
	// Get data from sessionStorage.
	sessionData:any = sessionStorage.getItem('sessionStart');
	profileId:any = JSON.parse(this.sessionData)!.token;
	headers:any;
	icon = { faRightFromBracket, faHome, faClapperboard, faCompass, faSquarePlus}
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
	
	// open signup modal
	createModal(){
		this._modal.postModal(true);
	}

	
	// Api call function.
	logout(){
		// Check session is set or not.
		if(this.sessionData){      
		// Remoe data from session storage.
		sessionStorage.clear();
		this._router.navigate(['/account']);
		return;
		}
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
}
