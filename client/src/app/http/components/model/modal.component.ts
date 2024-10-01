import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal-style.scss']
})
export class ModalComponent implements OnInit, OnDestroy{
  modlValue!:any;               // Store modal value.
  constructor(private _modal:ModalService){}        // Import Modal service.
  
  ngOnInit(): void {
    this._modal.successValue.subscribe((res)=>{
      this.modlValue = res;
    });
  }

  closeModal(){
    this.modlValue = '';
  }

  ngOnDestroy(): void {
    // this._modal.successValue.emit('');
  }

}
