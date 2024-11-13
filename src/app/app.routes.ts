import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { MainProductComponent } from './components/main-product/main-product.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { authoGuard } from '../guards/autho.guard';
import { OrdersComponent } from './components/orders/orders.component';




export const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: "Home Page"},
    {path: "register", component: RegisterComponent, title: "Register"},
    {path: 'home', component: HomeComponent, title: "Home"},
    {path: "Sidebar", component: SidebarComponent, title: "Sidebar"},
    {path: 'single-product/:id', component: ProductDetailsComponent , title : 'Product Details' },
    {path: "orders", canActivate:[authoGuard], component:OrdersComponent, title:"Orders"},
    {path: 'ProductCategory/:id', component: MainProductComponent, title: 'Products Page'},
    {path: 'search', component: SearchComponent, title: 'search Page'},
    //{path:"profile",canActivate:[authoGuard],component:ProfileComponent,title:"Profile"},
  ]},
  {path: 'checkout', canActivate:[authoGuard], component: CheckoutComponent, title: 'Checkout'},
  //wild card route
  {path:'**',component:ErrorComponent,title:"Not found"}

];





















