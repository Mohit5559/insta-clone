import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  // Modal data event emitter.
  successValue = new EventEmitter<any>();
  errorValue = new EventEmitter<any>();
  confirmValue = new EventEmitter<any>();
  formValue = new EventEmitter<any>();

  // Modal object.
  confirmation = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  /** show successful modal. */
  modal(modalData?: string[]){
    this.successValue.emit(modalData);
  }
  
  /** show form modal. */
  form(modalData?: string[]){
    this.formValue.emit(modalData);
  }
}
