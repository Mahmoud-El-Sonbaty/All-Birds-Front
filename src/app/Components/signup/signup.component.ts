import { Component } from '@angular/core';
import { Username } from '../../../model/username';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username:Username={} as Username;

  Adduser(){
    console.log(this.username);
    
  }

}
