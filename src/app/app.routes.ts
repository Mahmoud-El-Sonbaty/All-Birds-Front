import { Routes } from '@angular/router';
import { authoGuard } from '../guards/autho.guard';
import { RegisterComponent } from './components/register/register.component';
import { MainProductComponent } from './components/main-product/main-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';


export const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    // {path: '', redirectTo: 'checkout', pathMatch: 'full'},
    {path: "register", component: RegisterComponent, title: "Register"},
    {path: 'home', component: HomeComponent, title: "Home"},
    {path: 'collections', component: MainProductComponent, title: 'Collections'},
  ]},
  {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
  //{path:"home",canActivate:[authoGuard],component:HomeComponent,title:"home"},
];
