import { CanActivateFn } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

export const authGuard: CanActivateFn = async (route, state) => {
  let isLogged:any;
  
  // // Get data from sessionStorage.
  let sessionData:any = sessionStorage.getItem('sessionStart');
  let parseSessionData = JSON.parse(sessionData);
     
  // Create data for the token validation api.
  let tokenValidation:any = {
    token:parseSessionData!
  }

  // axios for api call
  await axios.post(`${environment.BACKEND_BASEURL}account/token`, tokenValidation)
  .then(
    response => {
      isLogged = response.data.data;
    }
  ).catch(err => {console.log(err);});
  
  return isLogged;
};
