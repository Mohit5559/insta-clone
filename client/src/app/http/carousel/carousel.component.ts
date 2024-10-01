import { Component, Input, OnInit } from '@angular/core';

interface carouselImage{
  imageSrc:string;
  imageAlt:string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{
  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() control = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  selectedIndex=0;

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

  // Changes slide in every 3 seconds
  autoSlideImages():void{
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  // Set index of image on dot/indicator click
  selectedImage(index: number):void{
    this.selectedIndex = index;
  }

  // Slide move on button click.
  onPrevClick():void{
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length - 1;
    }else{
      this.selectedIndex--;
    }
  }

  onNextClick():void{
    if(this.selectedIndex === this.images.length - 1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }
  }

}
