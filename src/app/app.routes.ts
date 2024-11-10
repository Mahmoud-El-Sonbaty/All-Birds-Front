import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { RegisterComponent } from './Components/register/register.component';
import { MainProductComponent } from './Components/main-product/main-product.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { SearchComponent } from './Components/search/search.component';


export const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home',component:HomeComponent,title:"Home Page"},
    {path: "register", component: RegisterComponent, title: "Register"},
    {path: 'home', component: HomeComponent, title: "Home"},
    {path:"Sidebar",component:SidebarComponent,title:"Sidebar"},
    {path: "CheckOut", component: CheckoutComponent, title: "CheckOut"},
    {path: 'ProductCategory/:id', component: MainProductComponent, title: 'Products Page'},
    {path: 'productDetails', component: ProductDetailsComponent, title: 'Product Details  Page'},
    {path: 'search', component: SearchComponent, title: 'search Page'},

    //{path:"profile",canActivate:[authoGuard],component:ProfileComponent,title:"Profile"},
  ]},
  {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
  //wild card route
  {path:'**',component:ErrorComponent,title:"Not found"}

];













// export const routes: Routes = [
//   {path: '', component: MainLayoutComponent, children: [
//     {path: '', redirectTo: 'home', pathMatch: 'full'},
//     {path:'home',component:HomeComponent,title:"Home Page"},
//     {path: "register", component: RegisterComponent, title: "Register"},
//     {path: "CheckOut", component: CheckoutComponent, title: "CheckOut"},
//     // {path: 'home', component: HomeComponent, title: "Home"},
//     {path: 'collections', component: MainProductComponent, title: 'Collections'},
//     {path:"Sidebar",component:SidebarComponent,title:"Sidebar"}
//   ]},
//   {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
//   //{path:"home",canActivate:[authoGuard],component:HomeComponent,title:"home"},
//   //wild card route
//   {path:'**',component:ErrorComponent,title:"Not found"}

// ];





