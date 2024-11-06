import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe,SharedModule],
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
