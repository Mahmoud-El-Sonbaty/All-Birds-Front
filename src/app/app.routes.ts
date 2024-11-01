import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';

export const routes: Routes = [

  {path:'',component:HomeComponent
  ,children:[

  // {path:'main',component:MainComponent,title:"main Page"},
  {path:'home',component:HomeComponent,title:"Home Page"},


]},

//wild card route
{path:'**',component:ErrorComponent,title:"Not found"}


];
