import { Component } from '@angular/core';
import { Username } from '../../../models/username';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
// import { UsernameServicesService } from '../../username-services.service';
import { UsernameService } from '../../../services/username.service';
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

  constructor(private _UsernameService :UsernameService,private cook:CookieService,private router :Router){}
  
    Adduser(){
    //CreateUser
    console.log(this.username);
    
//add in cooks 
    this.cook.set("Email",this.username.Email);

    this._UsernameService.register(this.username).subscribe({
      next:()=>{
      this.router.navigateByUrl("/home");
      
      }
      
      })



  }
  isEmailValid():Boolean{



return this.username.Email.includes("@"); 

  }
  ispasswordvaild():boolean{
    
    return /\d/.test(this.username.Password); 
  }

}
