import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Create an Account/register/register.component';
import { authoGuard } from '../guards/autho.guard';
// import { MainProductComponent } from './components/main-product/main-product.component';


export const routes: Routes = [
  // { path: 'Collections', component: MainProductComponent, title: 'Collections'},
  // { path :'Product' ,component : MainProductComponent , title : 'Product Page' }
{path:"home",canActivate:[authoGuard],component:HomeComponent,title:"home"},
{path:"",component:RegisterComponent,title:"Register"}

// ,canActivate:[authoGuard]

];
