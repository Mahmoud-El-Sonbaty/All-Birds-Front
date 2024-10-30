import { Routes } from '@angular/router';
import { MainProductComponent } from './Components/MainProduct/main-product/main-product.component';


export const routes: Routes = [
  { path: '', component: MainProductComponent },
  { path :'Product' ,component : MainProductComponent , title : 'Product Page' }
];
