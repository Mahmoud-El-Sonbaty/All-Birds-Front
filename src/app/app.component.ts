import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './Components/ProductCard/product-card/product-card.component';
import { ProductFilterComponent } from './Components/ProductFilter/product-filter/product-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , ProductCardComponent ,ProductFilterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontAllbirds';
}
