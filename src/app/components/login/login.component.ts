import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsernameService } from '../../../services/username.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsernameCheck } from '../../../models/username-check';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public forgotPasswordForm: FormGroup;
  message: string = '';
  constructor(private _UsernameService :UsernameService,private cook :CookieService,private router :Router,private fb: FormBuilder, private http: HttpClient){
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
    this._UsernameService.getUserByEmail(this.usernameCheck).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem("userToken", res)
        this.router.navigate(["/home"]);

      },

      error:(err) => {
        console.log(err);
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




    return  (!!this.usernameCheck.Email && this.usernameCheck.Email.includes("@"));



      }
      ispasswordvaild():boolean{

        return /\d/.test(this.usernameCheck.Password);
      }


isCanLogin():Boolean{

  if(this.usernameCheck.Email!=undefined&&this.usernameCheck.Password!=undefined)
  {
    // console.log(false);
  if(this.isEmailValid()==true&&this.ispasswordvaild()==true)

    {


      return false;

    }
    return true;
  }
  console.log(true);

  return true;
  }

}
// getUserByEmail
