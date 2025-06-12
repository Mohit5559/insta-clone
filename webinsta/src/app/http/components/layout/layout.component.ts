import { Component } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  icon = { faChevronUp }
  constructor () {
    // Scroll to top.
    document.addEventListener('scroll', () => {
      let myButtton = document.querySelector('.scrollTop');
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButtton!.classList.add('show');        
      } else {
        myButtton!.classList.remove('show');
      }  
    })
    
  }

  // When the user clicks on the button, scroll to the top of the document.
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
