import { Component } from '@angular/core';
import { Username } from '../../../model/username';
import { UsernameCheck } from '../../../model/username-check';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,JsonPipe,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // username:Username={} as Username;
  usernameCheck:UsernameCheck={} as UsernameCheck;
  showResetPasswordFormbool:boolean=false;
  check(){
    console.log(this.usernameCheck);
    
  }
  public showResetPasswordForm(){
this.showResetPasswordFormbool=true;


  }
  public hideResetPasswordForm(){
console.log("sssssssss");

    this.showResetPasswordFormbool=false;

  }
  checkforget(){
    
  }
  
}
