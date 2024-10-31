import { Routes } from '@angular/router';
import { MainProductComponent } from './components/main-product/main-product.component';


export const routes: Routes = [
  { path: 'Collections', component: MainProductComponent, title: 'Collections'},
  // { path :'Product' ,component : MainProductComponent , title : 'Product Page' }
];
