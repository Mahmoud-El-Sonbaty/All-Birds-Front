import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [ProductCardComponent,ProductFilterComponent,SharedModule],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.css'
})
export class MainProductComponent {

}
