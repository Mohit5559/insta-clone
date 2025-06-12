import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {  
  // public data:any;
  mydata = new EventEmitter<any>();
  // isLogged = new BehaviorSubject<boolean>(false);
  isLogged = new EventEmitter<any>(false);

  constructor(){}

  setData(data:any){ 
    this.mydata.emit(data);
  }

  setIsLogged(data:any){    
    this.isLogged.emit(data);
  }
}
