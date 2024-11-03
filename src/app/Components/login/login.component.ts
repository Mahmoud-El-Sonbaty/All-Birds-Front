import { Component } from '@angular/core';
import { Username } from '../../../models/username';
import { UsernameCheck } from '../../../models/username-check';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsernameServicesService } from '../../../services/username-services.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,JsonPipe,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public forgotPasswordForm: FormGroup;
  message: string = '';
  constructor(private _UsernameServicesService :UsernameServicesService,private cook :CookieService,private root :Router,private fb: FormBuilder, private http: HttpClient){
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }




  // username:Username={} as Username;
  usernameCheck:UsernameCheck={} as UsernameCheck;
 
  showResetPasswordFormbool:boolean=false;
  check(){
    console.log(this.usernameCheck);
    
   //add cooks
   this.cook.set("Email",this.usernameCheck.Email);
    this._UsernameServicesService.getUserByEmail(this.usernameCheck.Email).subscribe({

      next:()=>{
      this.root.navigateByUrl("/home");
      
      }
      
      })

  }
  public showResetPasswordForm(){
this.showResetPasswordFormbool=true;





  }

  public hideResetPasswordForm(){


    this.showResetPasswordFormbool=false;

  }
  public  onSubmit(){
    const email = this.usernameCheck.Email;
    this.http.post('/api/password-reset', { email }).subscribe({
      next: () => (this.message = 'We have sent you an email to reset your password.'),
      error: () => (this.message = 'There was an error, please try again later.')
    });


  }
  isEmailValid():Boolean{



    return this.usernameCheck.Email.includes("@");
    
      }
      ispasswordvaild():boolean{
        
        return /\d/.test(this.usernameCheck.Password); 
      }
 
  
}
// getUserByEmail