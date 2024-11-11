import { Component } from '@angular/core';
import { UsernameCheck } from '../../../models/username-check';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsernameService } from '../../../services/username.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../services/cart.service';
import { IOrderDetail, IOrderMaster, IUpdateWholeOrder } from '../../../models/cart';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  getCartFromAPI() {
    this.cartService.getCart(localStorage.getItem("userToken")!).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.isSuccess) {
          // this.userCart = res.data
          localStorage.setItem("cart", JSON.stringify(res.data))
          localStorage.removeItem("flag");
        }
        else
          console.log(res.msg)
      },
      error:(err)=>{
        console.log(err);
        if (err.status == 401) {
          console.log(`this token ${localStorage.getItem("userToken")} is invalid`);
          localStorage.removeItem("userToken");
          this.router.navigateByUrl("register");
        }
        else if (err.status == 404) {
          localStorage.removeItem("cart");
          this.router.navigateByUrl("");
        }
      }
    })
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
          // here we should update update whole cart in the api
          let localCart: IOrderMaster = JSON.parse(localStorage.getItem("cart")!);
          let order: IUpdateWholeOrder = {
            id: localCart.id,
            clientId: localCart.clientId,
            total: localCart.total,
            productColorSizeId: []
          };
          for (const det of localCart.orderDetails) {
            order.productColorSizeId.push({
              id: det.id,
              productId: det.productColorSizeId,
              orderMasterId: localCart.id,
              detailPrice: det.detailPrice,
              quantity: det.quantity
            });
          }
          console.log(order);
          if (order.id == 0) { // create new order
            this.cartService.createNewOrder(order, res).subscribe({
              next: (res) => {
                if (res.isSuccess)
                  this.getCartFromAPI();
                else
                  console.log(res.msg);
              }
            })
          }
          else { // update the cart
            this.cartService.updateWholeCart(order, res).subscribe({
              next: (res) => {
                console.log(res);
                if (res.isSuccess) {
                  console.log(res.data);
                  console.log("going to api");
                  this.getCartFromAPI();
                }
                else {
                  console.log(res.msg);
                }
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        }
        else if (localStorage.getItem("cart") == null && localStorage.getItem("flag")) {// he deleted all the cart from the local storage while he was not authenticated
          // here delete all the cart
          this.cartService.deleteOrderMaster(res).subscribe({
            next: (res) => {
              console.log(res);
              if (res.isSuccess) {
                localStorage.removeItem("flag");
                localStorage.removeItem("cart");
              }
              else {
                console.log(res.msg);
              }
            },
            error: (err) => {
              console.log(err);
              if (err.status == 401) {
                localStorage.removeItem("userToken");
              }
            }
          })
        }
        else { // here update the cart from the back end
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
