import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent,SignupComponent,SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
