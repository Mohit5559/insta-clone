import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit{
  toasterValue: any;
  constructor(private _toaster:ToasterService){}

  ngOnInit(): void {
    this._toaster.toasterValue.subscribe((res)=>{
      this.toasterValue = res;      
      // When toasterValue have value.
      if(this.toasterValue !== ''){
        this.closeToastr();
      }
    });
  }

  // Toaster close automatically.
  closeToastr(){
    // window.setTimeout(()=>{
    //   this.toasterValue = '';      
    // }, 5000);

    setTimeout(()=>{
      this.toasterValue = '';      
    }, 4000);
  }
}