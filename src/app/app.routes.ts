import { Routes } from '@angular/router';
import { MainProductComponent } from './components/main-product/main-product.component';
import { SearchComponent } from './components/Search/search/search.component';

export const routes: Routes = [
  { path: 'ProductCategory/:id', component: MainProductComponent, title: 'Product Page' },
  { path: 'search', component: SearchComponent, title: 'Search' }

];
