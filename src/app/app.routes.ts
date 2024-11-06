import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { RegisterComponent } from './Components/register/register.component';
import { MainProductComponent } from './Components/main-product/main-product.component';

export const routes: Routes = [

  {path:'',component:HomeComponent
  ,children:[

  // {path:'main',component:MainComponent,title:"main Page"},
  {path:'home',component:HomeComponent,title:"Home Page"},

  {path:'Productcard',component:ProductCardComponent,title:"Productcard Page"},
  {path:"Sidebar",component:SidebarComponent,title:"Sidebar"},
  {path: "register", component: RegisterComponent, title: "Register"},
  {path: 'collections', component: MainProductComponent, title: 'Collections'},


]},
{path: 'checkout', component: CheckoutComponent, title: 'Checkout'},


//wild card route
{path:'**',component:ErrorComponent,title:"Not found"}


];




// import { Routes } from '@angular/router';
// import { authoGuard } from '../guards/autho.guard';
// import { RegisterComponent } from './components/register/register.component';
// import { MainProductComponent } from './components/main-product/main-product.component';
// import { CheckoutComponent } from './components/checkout/checkout.component';
// // import { HomeComponent } from './components/home/home.component';
// import { MainLayoutComponent } from './components/main-layout/main-layout.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { HomeComponent } from './components/home/home.component';
// import { ErrorComponent } from './components/error/error.component';

// export const routes: Routes = [
//   {path: '', component: MainLayoutComponent, children: [
//     {path: '', redirectTo: 'home', pathMatch: 'full'},
//     {path:'home',component:HomeComponent,title:"Home Page"},
//     {path: "register", component: RegisterComponent, title: "Register"},
//     {path: 'home', component: HomeComponent, title: "Home"},
//     {path: 'collections', component: MainProductComponent, title: 'Collections'},
//     {path:"Sidebar",component:SidebarComponent,title:"Sidebar"}
//   ]},
//   {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
//   //{path:"home",canActivate:[authoGuard],component:HomeComponent,title:"home"},
//   //wild card route
//   {path:'**',component:ErrorComponent,title:"Not found"}

// ];
