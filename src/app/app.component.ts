import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// <<<<<<< HEAD
import { RegisterComponent } from "./Create an Account/register/register.component";
// import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
// =======
// import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
// >>>>>>> main

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: [RouterOutlet, RegisterComponent, NavBarComponent],
  imports: [ RegisterComponent,RouterOutlet],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  title = 'FrontAllbirds';
}
////////////////////////

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// <<<<<<< HEAD
// import { RegisterComponent } from "./Create an Account/register/register.component";
// import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
// =======
// import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
// >>>>>>> main

// @Component({
//   selector: 'app-root',
//   standalone: true,
// <<<<<<< HEAD
//   imports: [RouterOutlet, RegisterComponent, NavBarComponent],
// =======
//   imports: [RouterOutlet, NavBarComponent],
// >>>>>>> main
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'FrontAllbirds';


// }
