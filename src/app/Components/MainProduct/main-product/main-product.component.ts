import { Component } from '@angular/core';
import { ProductCardComponent } from "../../ProductCard/product-card/product-card.component";
import { ProductFilterComponent } from "../../ProductFilter/product-filter/product-filter.component";

@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.css'
})
export class MainProductComponent {

}
