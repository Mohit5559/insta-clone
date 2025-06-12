import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback-component',
  templateUrl: './auth-callback-component.component.html',
  styleUrls: ['./auth-callback-component.component.scss']
})
export class AuthCallbackComponentComponent implements OnInit {
  // Get data from sessionStorage.
  sessionData:any = sessionStorage.getItem('sessionStart');
  parseSessionData = JSON.parse(this.sessionData);
  
  constructor(private _route:ActivatedRoute, private _router:Router ){}
  
  ngOnInit():void{
    // Get token from query params
    this._route.queryParams.subscribe(params => {      
      // Set session storage for privacy.
      sessionStorage.setItem('sessionStart', params['user']);

      // Redirect on dashboard.
      this._router.navigate(['/dashboard']);
    })
  }
}
