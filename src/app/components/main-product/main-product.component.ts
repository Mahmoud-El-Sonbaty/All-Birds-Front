import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';

// import { ProductCardComponent } from "../../product-card/product-card.component";
// import { ProductFilterComponent } from "../../product-filter/product-filter.component";

@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.css'
})
export class MainProductComponent {

}
