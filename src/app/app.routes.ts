import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Create an Account/register/register.component';
import { authoGuard } from '../guards/autho.guard';
import { MainProductComponent } from './components/main-product/main-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


export const routes: Routes = [
  {path:"Register",component:RegisterComponent,title:"Register"}
  { path: 'Collections', component: MainProductComponent, title: 'Collections'},
  { path: 'Checkout', component: CheckoutComponent, title: 'Checkout'},
  //{path:"home",canActivate:[authoGuard],component:HomeComponent,title:"home"},
];
