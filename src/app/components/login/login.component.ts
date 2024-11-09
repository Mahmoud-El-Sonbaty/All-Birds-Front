import { Component } from '@angular/core';
import { UsernameCheck } from '../../../models/username-check';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsernameService } from '../../../services/username.service';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule, SidebarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public forgotPasswordForm: FormGroup;
  message: string = '';//private cook :CookieService,
  constructor(private _UsernameService: UsernameService, private cartService: CartService, private router: Router, private fb: FormBuilder, private http: HttpClient){
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
    // this.cook.set("Email",this.usernameCheck.Email);
    this._UsernameService.getUserByEmail(this.usernameCheck).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem("userToken", res)
        if(localStorage.getItem("cart") && localStorage.getItem("flag")) {
          // here we should update the whole order in the api
        }
        else {
          console.log("going to api");
          this.cartService.getCart(localStorage.getItem("userToken")!).subscribe({
            next:(res)=>{
              console.log(res);
              if (res.isSuccess) {
                // this.userCart = res.data
                localStorage.setItem("cart", JSON.stringify(res.data))
              }
              else
                console.log(res.msg)
            },
            error:(err)=>{
              console.log(err);
              if (err.status == 401) {
                localStorage.removeItem("userToken");
                this.router.navigateByUrl("register");
              }
              else if (err.status == 404) {
                localStorage.removeItem("cart")
                this.router.navigateByUrl("");
              }
              // if(localStorage.getItem("cart"))
              //   this.userCart = JSON.parse(localStorage.getItem("cart")!);
            }
          })
        }
        this.router.navigateByUrl("");
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
