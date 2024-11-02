import { Routes } from '@angular/router';
import { MainProductComponent } from './components/main-product/main-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


export const routes: Routes = [
  { path: 'Collections', component: MainProductComponent, title: 'Collections'},
  { path: 'Checkout', component: CheckoutComponent, title: 'Collections'},
  // { path :'Product' ,component : MainProductComponent , title : 'Product Page' }
];
