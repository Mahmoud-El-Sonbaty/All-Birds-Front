import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

}

// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [CurrencyPipe , NgbCarouselModule ],
