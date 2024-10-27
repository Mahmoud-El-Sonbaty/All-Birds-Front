import { Component } from '@angular/core';
import { LoginComponent } from "../../Components/login/login.component";

import { SignupComponent } from "../../Components/signup/signup.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent,SignupComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
