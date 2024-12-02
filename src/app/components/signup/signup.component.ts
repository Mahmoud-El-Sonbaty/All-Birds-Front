import { Component } from '@angular/core';
import { Username } from '../../../models/username';
import { UsernameService } from '../../../services/username.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username:Username={} as Username;

  constructor(private _UsernameService :UsernameService,private cook:CookieService,private router :Router){}

    Adduser(){
    //CreateUser
    console.log(this.username);

//add in cooks
    this.cook.set("Email",this.username.email);

    this._UsernameService.register(this.username).subscribe({
      next:()=>{
      this.router.navigateByUrl("/home");
      alert('register successfully')

      },
      error: (err) => {
        alert(err.error)
      }

      })



  }
  isEmailValid():Boolean{

// console.log("sssssss");

// console.log(this.username.Email);
return  (!!this.username.email && this.username.email.includes("@"));

  }
  ispasswordvaild():boolean{

    return /\d/.test(this.username.password);
  }

isCansignup():Boolean{

if(this.username.email!=undefined&&this.username.password!=undefined&&this.username.confirmPassword!=undefined)
{
  // console.log(false);
if(this.isEmailValid()==true&&this.ispasswordvaild()==true&&(this.username.password==this.username.confirmPassword))

  {
    console.log("sssssssssssss");

    console.log(this.isEmailValid());console.log(this.ispasswordvaild());console.log((this.username.password==this.username.confirmPassword));

    console.log("sssssssssss");

    return false;

  }
  return true;
}
console.log(true);

return true;
}

}
