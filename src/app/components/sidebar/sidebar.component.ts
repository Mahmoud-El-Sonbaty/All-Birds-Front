import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrderDetail, IOrderMaster } from '../../../models/cart';
import { environment } from '../../../environments/environment.development';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
interface CartItem {
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (localStorage.getItem("cart"))
      this.userCart = JSON.parse(localStorage.getItem("cart")!)
  }
  userCart: IOrderMaster = {} as IOrderMaster;
  baseImagePath: string = environment.BaseImagePath;
// //
//  cartItems: CartItem[] = [
//   {
//     name: "Men's Runner Protect",
//     color: "Natural Black",
//     size: "8.5",
//     price: 130,
//     quantity: 1,
//     imageUrl: "data:image/webp;base64,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"
//   },
//   {
//     name: "Men's Tree Runners",
//     color: "Kaikoura White",
//     size: "8",
//     price: 98,
//     quantity: 1,
//     imageUrl: "data:image/webp;base64,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"
//   },
// ];

 //cartItems: CartItem[] = [];


  constructor(private cartService: CartService, private router: Router) {
    console.log(this.userCart)
    this.getCart();
  }
  ngOnChanges(): void {
    console.log("changes");

    // this.getCart();
  }
  goToCheckout(): void {
    this.router.navigateByUrl("checkout");
  }
// get subtotal(): number {
//   return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
// }
  updateQuantity(item: IOrderDetail, increase: boolean) {
    if (localStorage.getItem("userToken")) {
      if (localStorage.getItem("flag")) {
        let newQ: number = increase ? item.quantity + 1 : item.quantity - 1;
        this.userCart.total -= item.detailPrice;
        item.detailPrice = item.detailPrice / item.quantity * newQ;
        this.userCart.total += item.detailPrice;
        item.quantity = newQ;
        localStorage.setItem("cart", JSON.stringify(this.userCart))
        // here update the whole cart
        localStorage.removeItem("flag");
      }
      else {
        this.cartService.updateQuantity(item.id, increase ? item.quantity + 1 : item.quantity - 1, localStorage.getItem("userToken")!).subscribe({
          next:(res)=>{
            console.log(res);
            if (res.isSuccess) {
              localStorage.removeItem("flag");
              console.log(item.quantity)
              this.userCart.total -= item.detailPrice;
              item.detailPrice = res.data.detailPrice;
              item.quantity = res.data.quantity;
              this.userCart.total += item.detailPrice;
              // this.userCart = res.data
              localStorage.setItem("cart", JSON.stringify(this.userCart))
            }
            else
              console.log(res.msg)
          },
          error:(err)=>{
            console.log(err);
            if(localStorage.getItem("cart"))
              this.userCart = JSON.parse(localStorage.getItem("cart")!);
          }
        })
      }
    }
    else {
      let newQ: number = increase ? item.quantity + 1 : item.quantity - 1;
      this.userCart.total -= item.detailPrice;
      item.detailPrice = item.detailPrice / item.quantity * newQ;
      this.userCart.total += item.detailPrice;
      item.quantity = newQ;
      localStorage.setItem("flag", "true");
      localStorage.setItem("cart", JSON.stringify(this.userCart))
    }
  }
// increaseQuantity(item: IOrderDetail) {
//   item.quantity++;
// }

// decreaseQuantity(item: IOrderDetail) {
//   if (item.quantity > 1) item.quantity--;
// }
removeItem(item: IOrderDetail) {
  // this.items = this.items.filter(cartItem => cartItem !== item);
  // this.updateTotalItems();
}
//
private getCart() {
  console.log("getting cart")
  if(localStorage.getItem("userToken")) {
    // check local cart recent or send request
    if(localStorage.getItem("cart") && localStorage.getItem("flag")) {
      this.userCart = JSON.parse(localStorage.getItem("cart")!);
      // here we should update the whole order in the api
    } else {
      console.log("going to api");
      this.cartService.getCart(localStorage.getItem("userToken")!).subscribe({
        next:(res)=>{
          console.log(res);
          if (res.isSuccess) {
            this.userCart = res.data
            localStorage.setItem("cart", JSON.stringify(res.data))
            localStorage.removeItem("flag");
          }
          else
            console.log(res.msg)
        },
        error:(err)=>{
          console.log(err);
          if(localStorage.getItem("cart"))
            this.userCart = JSON.parse(localStorage.getItem("cart")!);
        }
      })
    }
  } else {
    if (localStorage.getItem("cart")) {
      console.log("found cart from local storage")
      this.userCart = JSON.parse(localStorage.getItem("cart")!)
    }
    // else
    //   //redirect out of the page
    //     this.router.navigate([""])
  }
}
}
