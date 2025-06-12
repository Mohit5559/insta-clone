import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit{
  loaderValue: any;
  constructor(private _loader:LoaderService){}

  ngOnInit(): void {
    this._loader.loaderValue.subscribe((res)=>{
      this.loaderValue = res;      
      // When loaderValue have value.
      if(this.loaderValue !== ''){
        this.closeLoader();
      }
    });
  }

  // loader close automatically.
  closeLoader(){
    // window.setTimeout(()=>{
    //   this.loaderValue = '';      
    // }, 5000);

    setTimeout(()=>{
      this.loaderValue = '';      
    }, 4000);
  }
}