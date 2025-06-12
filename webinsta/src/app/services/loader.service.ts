import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // loader data.
  loaderValue = new EventEmitter<any>();
  
  constructor() { }

  /** show toast */
  // show(message?: string){}

  /** show successful toast */
  loaderStatus(loaderData?: boolean){
    this.loaderValue.emit(loaderData);    
  }
}
