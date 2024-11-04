import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";

import { SignupComponent } from "../../components/signup/signup.component";

// import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, SignupComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
