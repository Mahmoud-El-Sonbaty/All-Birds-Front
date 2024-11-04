import { Component } from '@angular/core';
import { Username } from '../../../models/username';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
// import { UsernameServicesService } from '../../username-services.service';
import { UsernameServicesService } from '../../../services/username-services.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username:Username={} as Username;

  constructor(private _UsernameServicesService :UsernameServicesService,private cook:CookieService,private root :Router){}
  
    Adduser(){
    //CreateUser
    console.log(this.username);
    
//add in cooks 
this.cook.set("Email",this.username.Email);

    this._UsernameServicesService.CreateUser(this.username).subscribe({

      next:()=>{
      this.root.navigateByUrl("/home");
      
      }
      
      })



  }
  isEmailValid():Boolean{

// console.log("sssssss");

// console.log(this.username.Email);
return  (!!this.username.Email && this.username.Email.includes("@")); 

  }
  ispasswordvaild():boolean{
    
    return /\d/.test(this.username.Password); 
  }

isCansignup():Boolean{

if(this.username.Email!=undefined&&this.username.Password!=undefined&&this.username.Confirm_Password!=undefined)
{
  // console.log(false);
if(this.isEmailValid()==true&&this.ispasswordvaild()==true&&(this.username.Password==this.username.Confirm_Password))
  
  {
    console.log("sssssssssssss");
  
    console.log(this.isEmailValid());console.log(this.ispasswordvaild());console.log((this.username.Password==this.username.Confirm_Password));
    
    console.log("sssssssssss");
    
    return false;

  }
  return true;
}
console.log(true);

return true;
}

}
