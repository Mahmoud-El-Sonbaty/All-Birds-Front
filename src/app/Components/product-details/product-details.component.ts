import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ISingleProduct, ISingleProductColor, ISingleProductColorImage, ISingleProductColorSize } from '../../../Modules/singleProduct';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../../Services/product.service';
import { CartService } from '../../../Services/cart.service';
import { Router } from '@angular/router';
import { IAddOrderDetail, IAddOrderDetailResponseData, IOrderDetail, IOrderMaster, IUpdateWholeOrder } from '../../../Modules/cart';
import { LoaderComponent } from '../loader/loader.component';
import { AlertMessageComponent } from "../alert-message/alert-message.component";
import { LanguageService } from '../../../Services/language.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, LoaderComponent, AlertMessageComponent],
  templateUrl: './product-details.component.html',
  template: `
  <!-- <button (click)="toggleDirection()">
    Switch to {{ getDirection() === 'rtl' ? 'English' : 'Arabic' }}
  </button>
  <router-outlet></router-outlet> -->
`,
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  // export class ProductDetailsComponent implements OnInit, AfterViewInit {

    colors = [
      {
        name: 'Black', code: '#212121', images: [
          'images/product-details-images/1B.jpg',
          'images/product-details-images/2B.jpg',
          'images/product-details-images/3B.jpg',
          'images/product-details-images/4B.jpg',
          'images/product-details-images/5B.jpg',
          'images/product-details-images/6B.jpg'
        ]
      },
      {
        name: 'White', code: '#F5F5F5', images: [
          'images/product-details-images/1W.jpg',
          'images/product-details-images/2W.jpg',
          'images/product-details-images/3W.jpg',
          'images/product-details-images/4W.jpg',
          'images/product-details-images/5W.jpg',
          'images/product-details-images/6W.jpg'
        ]
      },
      {
        name: 'Navy', code: '#21384F', images: [
          'images/product-details-images/1N.jpg',
          'images/product-details-images/2N.jpg',
          'images/product-details-images/3N.jpg',
          'images/product-details-images/4N.jpg',
          'images/product-details-images/5N.jpg',
          'images/product-details-images/6N.jpg'
        ]
      },
      {
        name: 'Grey', code: '#787878', images: [
          'images/product-details-images/1G.jpg',
          'images/product-details-images/2G.jpg',
          'images/product-details-images/3G.jpg',
          'images/product-details-images/4G.jpg',
          'images/product-details-images/5G.jpg',
          'images/product-details-images/6G.jpg'
        ]
      },
      {
        name: 'Beige', code: '#F5F5DC', images: [
          'images/product-details-images/1BG.jpg',
          'images/product-details-images/2BG.jpg',
          'images/product-details-images/3BG.jpg',
          'images/product-details-images/4BG.jpg',
          'images/product-details-images/5BG.jpg',
          'images/product-details-images/6BG.jpg'
        ]
      },
    ];
  // ------------------------------ sonbaty code ----------------------------
    prdColors: ISingleProductColor[] = [];
    selectedPrdColorImages: ISingleProductColorImage[] = [];
    hoveredPrdColorId: number = 0;
    selectedPrdColorId: number = 0;
    @Input('id') prdId: number = 0;
    errors:boolean=false;
    isDataLoading: boolean = true;
    baseImagePath: string = environment.BaseIMageUrl;
    singlePrdData: ISingleProduct = {} as ISingleProduct;
    colorSizes: ISingleProductColorSize[] = [];
    selectedPrdColorSize: ISingleProductColorSize = {} as ISingleProductColorSize;
    selectedPrdColorSizeId: number = 0;
    selectedPrdColorImageId: number = 0;
    selectedColorObj: ISingleProductColor = {} as ISingleProductColor;
    selectedPrdColorImage: ISingleProductColorImage = {} as ISingleProductColorImage;
    changeColor(prdColorSelected: ISingleProductColor) {
      console.log(prdColorSelected);
      this.selectedPrdColorId = prdColorSelected.prdColorId;
      this.selectedPrdColorImageId = prdColorSelected.mainImageId;
      this.selectedColorObj = prdColorSelected;
      this.selectedPrdColorImage = prdColorSelected.prdColorImages.find(ele => ele["prdColorImageId"] == prdColorSelected.mainImageId) ?? {} as ISingleProductColorImage;
      console.log(this.selectedPrdColorImage);
      this.selectedPrdColorImages = prdColorSelected.prdColorImages;
      this.colorSizes = this.selectedColorObj.prdColorSizes;
      this.selectedPrdColorSize = {} as ISingleProductColorSize;
      this.selectedPrdColorSizeId = 0;
      console.log("changing");
    }
    changeSize(prdColorSizeSelected: ISingleProductColorSize) {
      console.log(prdColorSizeSelected);
      this.selectedPrdColorSize = prdColorSizeSelected;
      this.selectedPrdColorSizeId = prdColorSizeSelected.productColorSizeId;
    }
    changeImage(prdColorImageSelected: ISingleProductColorImage) {
      console.log(prdColorImageSelected.prdColorImageId);
      this.selectedPrdColorImageId = prdColorImageSelected.prdColorImageId;
      this.selectedPrdColorImage = prdColorImageSelected;
    }
    showNextImage() {
      let selectedImageIndex = this.selectedPrdColorImages.findIndex(i => i == this.selectedPrdColorImage);
      if (this.selectedPrdColorImages[selectedImageIndex + 1]) {
        this.selectedPrdColorImageId = this.selectedPrdColorImages[selectedImageIndex + 1].prdColorImageId;
        this.selectedPrdColorImage = this.selectedPrdColorImages[selectedImageIndex + 1];
      }
    }
    showPrevImage() {
      let selectedImageIndex = this.selectedPrdColorImages.findIndex(i => i == this.selectedPrdColorImage);
      if (this.selectedPrdColorImages[selectedImageIndex - 1]) {
        this.selectedPrdColorImageId = this.selectedPrdColorImages[selectedImageIndex - 1].prdColorImageId;
        this.selectedPrdColorImage = this.selectedPrdColorImages[selectedImageIndex - 1];
      }
    }
  // ------------------------------------------------------------------------
    // Hover color
    hoveredColorIndex: number | null = null;
    selectedColorIndex: number | null = null; // No color selected by default
    sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14];
    selectedSize = 0; // Default selected size
    selectedImageIndex = 0; // Default image index
    isCarouselOpen = false; // State for full screen carousel

    get selectedColorImages() {
      return this.selectedColorIndex !== null ? this.colors[this.selectedColorIndex].images : [];
    }

    get selectedImage() {
      return this.selectedColorImages[this.selectedImageIndex];
    }

    lang:string=''
    constructor(private productService: ProductService, private cartService: CartService, private router: Router,private language:LanguageService) {


      this.lang=language.getLanguage()


     }

    ngOnInit(): void {
      this.getProductFromAPI(this.prdId);
      // Initialize with the first color and first image by default
      // this.selectColor(0); // Select the first color
      // this.selectImage(0); // Select the first image of that color
    }

    // selectColor(index: number): void {
    //   console.log("changing color")
    //   this.selectedColorIndex = index; // Set the selected color index
    //   this.selectedImageIndex = 0; // Reset image index when color changes

    // }
    // text color when click circle
    get selectedColor() {
      return this.selectedColorIndex !== null ? this.colors[this.selectedColorIndex] : null;
  }


    selectSize(size: number): void {
      this.selectedSize = size; // Set selected size
    }

    selectImage(index: number): void {
      this.selectedImageIndex = index; // Set selected image index
    }

    nextImage(): void {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.selectedColorImages.length; // Move to the next image
    }

    previousImage(): void {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.selectedColorImages.length) % this.selectedColorImages.length; // Move to the previous image
    }

    openFullScreenCarousel(): void {
      this.isCarouselOpen = true; // Open the full screen carousel
    }

    closeFullScreenCarousel(): void {
      this.isCarouselOpen = false; // Close the full screen carousel
    }
    //magnifier
    isMagnifierVisible: boolean = false; // Property to control visibility

      // Show magnifier icon
      showMagnifier() {
        this.isMagnifierVisible = true;
      }

      // Hide magnifier icon
      hideMagnifier() {
        this.isMagnifierVisible = false;
      }

    // Accordion functionality
    // ngAfterViewInit(): void {
    //   const accordionButtons = document.querySelectorAll('.accordion-button');
    //   accordionButtons.forEach((button) => {
    //     const btnElement = button as HTMLButtonElement;

    //     btnElement.addEventListener('click', () => {
    //       const targetId = btnElement.getAttribute('data-bs-target');

    //       if (targetId) {
    //         const collapse = document.querySelector(targetId) as HTMLElement;

    //         if (collapse) {
    //           const isShown = collapse.classList.contains('show');

    //           // Remove 'show' class from all other accordion sections
    //           document.querySelectorAll('.accordion-collapse').forEach(section => {
    //             if (section !== collapse) {
    //               section.classList.remove('show');
    //             }
    //           });

    //           // Toggle the "show" class to activate the transition
    //           collapse.classList.toggle('show', !isShown);

    //           // Toggle 'collapsed' class to rotate arrow icon
    //           btnElement.classList.toggle('collapsed', isShown);

    //           // Update aria-expanded attribute for accessibility
    //           btnElement.setAttribute('aria-expanded', (!isShown).toString());
    //         }
    //       }
    //     });
    //   });
    // }
    //image swaping

    isSwiping = false;
    initialX: number | null = null;
    private debounceTimeout: any = null;

    debounce(func: () => void, delay: number): void {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(func, delay);
    }

    startSwipe(event: MouseEvent | TouchEvent): void {
      this.isSwiping = true;
      this.initialX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
    }

    onMouseMove(event: MouseEvent | TouchEvent): void {
      if (!this.isSwiping || this.initialX === null) return;

      const currentX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
      const diffX = currentX - this.initialX;

      const imageElement = document.querySelector('.main-product-image') as HTMLElement;
      if (diffX > 0) {
        imageElement.classList.add('swiping-right');
        imageElement.classList.remove('swiping-left');
      } else {
        imageElement.classList.add('swiping-left');
        imageElement.classList.remove('swiping-right');
      }

      if (diffX > 50) {
        this.debounce(() => this.previousImage(), 300);
        this.resetSwipe();
      } else if (diffX < -50) {
        this.debounce(() => this.nextImage(), 300);
        this.resetSwipe();
      }
    }

    resetSwipe(): void {
      this.isSwiping = false;
      this.initialX = null;

      const imageElement = document.querySelector('.main-product-image') as HTMLElement;
      imageElement.classList.remove('swiping-left', 'swiping-right');
    }


    //Rotate X exit in carousel
    onMouseEnter() {
      const closeButton = document.querySelector('.close-btn') as HTMLElement;
      if (closeButton) {
        closeButton.style.transform = 'rotate(90deg)';
        closeButton.style.transition = 'all .5s';
      }
    }

    onMouseLeave() {
      const closeButton = document.querySelector('.close-btn') as HTMLElement;
      if (closeButton) {
        closeButton.style.transform = 'rotate(0deg)';
        closeButton.style.transition = 'all .5s';
      }
    }


    // ----------------------------------------------------Sonbaty------------------------------------------------
    r = {
      "id":5,
      "orderNo":"OM-1264772173111/3/2024",
      "clientId":1,
      "total":456,
      "orderStateId":1,
      "notes":null,
      "couponId":null,
      "couponCode":null,
      "discountAmount":"",
      "discountPerctnage":" %",
      "orderDetails":[
        {"id":5,
          "productNameAr":"منتج 1",
          "productNameEn":"Men's Wool Runner Go",
          "colorNameAr":"أسود",
          "colorNameEn":"Black",
          "detailPrice":216,
          "quantity":3,
          "sizeNumber":"13.5",
          "imagePath":"/images/product-color-images/A10596_Natural_Black_Natural_Black_ANGLE_a3ccbb37-c8e2-4e94-975f-467e544f4717-316.png"
        },
        {
          "id":6,
          "productNameAr":"منتج 2",
          "productNameEn":"Men's Wool Piper Go",
          "colorNameAr":"أزرق",
          "colorNameEn":"Blue",
          "detailPrice":240,
          "quantity":2,
          "sizeNumber":"9.5",
          "imagePath":"/images/product-color-images/A10979_24Q3_Wool_Piper_2_Deep_Navy_Natural_White_PDP_SINGLE_3Q-2000x2000_55e869ae-e294-462d-85a9-247a6e2e26b7-933.png"
        }
      ]
    };
    addToCart() {
      if (localStorage.getItem("cart")) {
        console.log("found cart");
        //here we need to add the detail
        let cart: IOrderMaster = JSON.parse(localStorage.getItem("cart")!);
        if (localStorage.getItem("userToken")) {
          // he is logged in so we check for flag
          if (localStorage.getItem("flag")) {
            // here only put in the local storage then send the api request to update whole then set the response to the local storage
            let tryFindPrdColorSize = cart.orderDetails.find(d => d.productColorSizeId == this.selectedPrdColorSizeId);
            // this product already exist in the cart so we just increase the quantity
            if (tryFindPrdColorSize) {
              if (this.selectedPrdColorSize.unitsInStock > tryFindPrdColorSize.quantity){
                // there is enough stock to add to the cart
                tryFindPrdColorSize.detailPrice += tryFindPrdColorSize.detailPrice / tryFindPrdColorSize.quantity;
                tryFindPrdColorSize.quantity += 1;
                cart.total += tryFindPrdColorSize.detailPrice / tryFindPrdColorSize.quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                localStorage.setItem("flag", "true");
                let details: IAddOrderDetailResponseData[] = [];
                for (const det of cart.orderDetails) {
                  details.push(
                    {
                      id: det.id,
                      productId: det.productColorSizeId,
                      orderMasterId: cart.id,
                      detailPrice: det.detailPrice,
                      quantity: det.quantity
                    }
                  );
                }
                let wholeOrder: IUpdateWholeOrder = {
                  id: cart.id,
                  clientId: cart.clientId,
                  total: cart.total,
                  productColorSizeId: details
                };
                this.cartService.updateWholeCart(wholeOrder, localStorage.getItem("userToken")!).subscribe({
                  next: (res) => {
                    console.log(res);
                    if (res.isSuccess) {
                      localStorage.removeItem("flag");
                    }
                    else {
                      console.log(res.msg);
                    }
                  },
                  error: (err) => {
                    console.log(err);
                  }
                })
              }
              else { // not enough stock
                console.log("not enough stock");
              }
            }
            else { // this product is new so we add it
              let newDetail: IOrderDetail = {
                id: 0,
                productColorSizeId: this.selectedPrdColorSizeId,
                productId: this.singlePrdData.id,
                detailPrice: this.singlePrdData.price,
                quantity: 1,
                imagePath: this.selectedPrdColorImage.imagePath,
                productName: this.singlePrdData.name,
                colorName: this.selectedColorObj.colorName,
                sizeNumber: this.selectedPrdColorSize.sizeNumber
              };
              cart.orderDetails.push(newDetail);
              localStorage.setItem("cart", JSON.stringify(cart));
              localStorage.setItem("flag", "true");
              let details: IAddOrderDetailResponseData[] = [];
              for (const det of cart.orderDetails) {
                details.push(
                  {
                    id: det.id,
                    productId: det.productColorSizeId,
                    orderMasterId: cart.id,
                    detailPrice: det.detailPrice,
                    quantity: det.quantity
                  }
                );
              }
              let wholeOrder: IUpdateWholeOrder = {
                id: cart.id,
                clientId: cart.clientId,
                total: cart.total,
                productColorSizeId: details
              };
              this.cartService.updateWholeCart(wholeOrder, localStorage.getItem("userToken")!).subscribe({
                next: (res) => {
                  console.log(res);
                  if (res.isSuccess) {
                    localStorage.removeItem("flag");
                  }
                  else {
                    console.log(res.msg);
                  }
                },
                error: (err) => {
                  console.log(err);
                }
              })
            }
          } else { // here local is not advanced so we just send the request and set the new cart to the local storage
            let tryFindPrdColorSize = cart.orderDetails.find(d => d.productColorSizeId == this.selectedPrdColorSizeId);
            // this product already exist in the cart so we just increase the quantity
            if (tryFindPrdColorSize) {
              if (this.selectedPrdColorSize.unitsInStock > tryFindPrdColorSize.quantity){
                // there is enough stock to add to the cart
                tryFindPrdColorSize.quantity += 1;
                this.cartService.updateQuantity(tryFindPrdColorSize.id, tryFindPrdColorSize.quantity, localStorage.getItem("userToken")!).subscribe({
                  next:(res)=>{
                    if (res.isSuccess) {
                      localStorage.removeItem("flag");
                      tryFindPrdColorSize.detailPrice = res.data.detailPrice;
                      cart.total += tryFindPrdColorSize.detailPrice / tryFindPrdColorSize.quantity;
                      localStorage.setItem("cart", JSON.stringify(cart));
                    }
                    else
                      console.log(res.msg);
                  },
                  error:(err)=>{
                    console.log(err);
                  }
                })
                localStorage.setItem("cart", JSON.stringify(cart));
              }
              else { // not enough stock
                console.log("not enough stock");
              }
            }
            else { // this product is new so we add it to the cart with the api
              let detailToAdd: IAddOrderDetail = {
                orderMasterId: cart.id,
                productId: this.selectedPrdColorSizeId,
                detailPrice: this.singlePrdData.price,
                quantity: 1,
              };
              this.cartService.addOrderDetail(detailToAdd, localStorage.getItem("userToken")!).subscribe({
                next: (res) => {
                  if (res.isSuccess) {
                    let newDetail: IOrderDetail = {
                      id: res.data.id,
                      productColorSizeId: res.data.productId,
                      productId: this.singlePrdData.id,
                      detailPrice: res.data.detailPrice,
                      quantity: res.data.quantity,
                      imagePath: this.selectedPrdColorImage.imagePath,
                      productName: this.singlePrdData.name,
                      colorName: this.selectedColorObj.colorName,
                      sizeNumber: this.selectedPrdColorSize.sizeNumber
                    };
                    cart.orderDetails.push(newDetail);
                    cart.total += newDetail.detailPrice;
                    localStorage.setItem("cart", JSON.stringify(cart));
                  }
                  else {
                    console.log(res.msg);
                  }
                },
                error: err => {
                  console.log(err);
                }
              })
            }
          }
        }
        else { // here he is not logged in so we add the detail to local storage and set the flag
          let tryFindPrdColorSize = cart.orderDetails.find(d => d.productColorSizeId == this.selectedPrdColorSizeId);
          // this product already exist in the cart so we just increase the quantity
          console.log("not auth");
          if (tryFindPrdColorSize) {
            console.log("found prdcolorsize")
            if (this.selectedPrdColorSize.unitsInStock > tryFindPrdColorSize.quantity){
              // there is enough stock to add to the cart
              console.log("stock available")
              tryFindPrdColorSize.detailPrice += tryFindPrdColorSize.detailPrice / tryFindPrdColorSize.quantity;
              tryFindPrdColorSize.quantity += 1;
              console.log(tryFindPrdColorSize.quantity, tryFindPrdColorSize.detailPrice);
              cart.total += tryFindPrdColorSize.detailPrice / tryFindPrdColorSize.quantity;
              localStorage.setItem("cart", JSON.stringify(cart));
              localStorage.setItem("flag", "true");
            }
            else { // not enough stock
              console.log("not enough stock");
            }
          }
          else { // this product is new so we add it
            console.log("adding new detail");
            let newDetail: IOrderDetail = {
              id: 0,
              productColorSizeId: this.selectedPrdColorSizeId,
              productId: this.singlePrdData.id,
              detailPrice: this.singlePrdData.price,
              quantity: 1,
              imagePath: this.selectedPrdColorImage.imagePath,
              productName: this.singlePrdData.name,
              colorName: this.selectedColorObj.colorName,
              sizeNumber: this.selectedPrdColorSize.sizeNumber
            };
            cart.orderDetails.push(newDetail);
            cart.total += newDetail.detailPrice;
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("flag", "true");
          }
        }
      }
      else {
        // here we need to create the whole order from the start
        if (localStorage.getItem("userToken")) {
          // here we will send the request to add it from the back end
          let cart: IOrderMaster = {
            id: 0,
            clientId: 0,
            total: this.singlePrdData.price,
            orderDetails: [{
              id: 0,
              productColorSizeId: this.selectedPrdColorSizeId,
              productId: this.singlePrdData.id,
              detailPrice: this.singlePrdData.price,
              quantity: 1,
              colorName: this.selectedColorObj.colorName,
              imagePath: this.selectedPrdColorImage.imagePath,
              productName: this.singlePrdData.name,
              sizeNumber: this.selectedPrdColorSize.sizeNumber
            }]
          }
          let orderToCreate: IUpdateWholeOrder = {
            id: 0,
            clientId: 0,
            total: this.singlePrdData.price,
            productColorSizeId: [{
              id: 0,
              orderMasterId: 0,
              productId: this.selectedPrdColorSizeId,
              detailPrice: this.singlePrdData.price,
              quantity: 1
            }]
          }
          this.cartService.createNewOrder(orderToCreate, localStorage.getItem("userToken")!).subscribe({
            next: (res) => {
              if (res.isSuccess){
                cart.id = res.data.id;
                cart.clientId = res.data.clientId;
                cart.orderDetails[0].id = res.data.productColorSizeId[0].id;
                localStorage.setItem("cart", JSON.stringify(cart));
              }
              else {
                console.log(res.msg);
              }
            },
            error: (err) => {
              console.log(err);
            }
          })
        } else {
          //here we should add the whole new order to the local storage along with the flag
          let cart: IOrderMaster = {
            id: 0,
            clientId: 0,
            total: this.singlePrdData.price,
            orderDetails: [{
              id: 0,
              productColorSizeId: this.selectedPrdColorSizeId,
              productId: this.singlePrdData.id,
              detailPrice: this.singlePrdData.price,
              quantity: 1,
              colorName: this.selectedColorObj.colorName,
              imagePath: this.selectedPrdColorImage.imagePath,
              productName: this.singlePrdData.name,
              sizeNumber: this.selectedPrdColorSize.sizeNumber
            }]
          }
          console.log("adding new cart from the begining");
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem("flag", "true");
        }
      }
    }

  //   addToCart() {
  //     let cart = this.getCartFromLocalStorage();
  //     let isLoggedIn = !!localStorage.getItem("userToken");
  //     let isAdvancedFlagSet = !!localStorage.getItem("flag");

  //     if (!cart) {
  //         this.initializeCart(isLoggedIn);
  //         return;
  //     }

  //     let existingDetail = this.findProductInCart(cart, this.selectedPrdColorSizeId);

  //     if (isLoggedIn) {
  //         if (isAdvancedFlagSet) {
  //             this.handleAdvancedCartUpdate(cart, existingDetail);
  //         } else {
  //             this.handleBasicCartUpdate(cart, existingDetail);
  //         }
  //     } else {
  //         this.handleGuestCartUpdate(cart, existingDetail);
  //     }
  // }

  // // Utility Functions
  // private getCartFromLocalStorage(): IOrderMaster | null {
  //     return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : null;
  // }

  // private findProductInCart(cart: IOrderMaster, productColorSizeId: number): IOrderDetail | undefined {
  //     return cart.orderDetails.find(d => d.productColorSizeId === productColorSizeId);
  // }

  // // Cart Initialization
  // private initializeCart(isLoggedIn: boolean) {
  //     let cart: IOrderMaster = this.createInitialCart();
  //     if (isLoggedIn) {
  //         this.cartService.createNewOrder(this.prepareOrderRequest(cart), localStorage.getItem("userToken")!).subscribe(this.handleCartResponse(cart));
  //     } else {
  //         this.saveCartToLocalStorage(cart);
  //         localStorage.setItem("flag", "true");
  //     }
  // }

  // private createInitialCart(): IOrderMaster {
  //     return {
  //         id: 0,
  //         clientId: 0,
  //         total: this.singlePrdData.price,
  //         orderDetails: [this.createOrderDetail()]
  //     };
  // }

  // private createOrderDetail(): IOrderDetail {
  //     return {
  //         id: 0,
  //         productColorSizeId: this.selectedPrdColorSizeId,
  //         productId: this.singlePrdData.id,
  //         detailPrice: this.singlePrdData.price,
  //         quantity: 1,
  //         imagePath: this.selectedPrdColorImage.imagePath,
  //         productName: this.singlePrdData.name,
  //         colorName: this.selectedColorObj.colorName,
  //         sizeNumber: this.selectedPrdColorSize.sizeNumber
  //     };
  // }

  // // Advanced Update for Logged-in User
  // private handleAdvancedCartUpdate(cart: IOrderMaster, existingDetail?: IOrderDetail) {
  //     if (existingDetail) {
  //         this.updateExistingItem(cart, existingDetail);
  //     } else {
  //         this.addNewItemToCart(cart);
  //     }
  // }

  // private handleBasicCartUpdate(cart: IOrderMaster, existingDetail?: IOrderDetail) {
  //     if (existingDetail) {
  //         this.updateExistingItemAPI(cart, existingDetail);
  //     } else {
  //         this.addNewItemToCartAPI(cart);
  //     }
  // }

  // // Guest Cart Update
  // private handleGuestCartUpdate(cart: IOrderMaster, existingDetail?: IOrderDetail) {
  //     if (existingDetail) {
  //         this.updateExistingItemLocally(cart, existingDetail);
  //     } else {
  //         this.addNewItemToLocalCart(cart);
  //     }
  // }

  // // Update Existing Item
  // private updateExistingItem(cart: IOrderMaster, existingDetail: IOrderDetail) {
  //     if (this.selectedPrdColorSize.unitsInStock > existingDetail.quantity) {
  //         existingDetail.quantity += 1;
  //         existingDetail.detailPrice += existingDetail.detailPrice / existingDetail.quantity;
  //         cart.total += existingDetail.detailPrice / existingDetail.quantity;
  //         this.saveCartToLocalStorage(cart);
  //         this.syncCartWithServer(cart);
  //     } else {
  //         console.log("not enough stock");
  //     }
  // }

  // private updateExistingItemAPI(cart: IOrderMaster, existingDetail: IOrderDetail) {
  //     if (this.selectedPrdColorSize.unitsInStock > existingDetail.quantity) {
  //         existingDetail.quantity += 1;
  //         this.cartService.updateQuantity(existingDetail.id, existingDetail.quantity, localStorage.getItem("userToken")!).subscribe({
  //             next: res => {
  //                 if (res.isSuccess) {
  //                     existingDetail.detailPrice = res.data.detailPrice;
  //                     cart.total += existingDetail.detailPrice / existingDetail.quantity;
  //                     this.saveCartToLocalStorage(cart);
  //                 } else {
  //                     console.log(res.msg);
  //                 }
  //             },
  //             error: err => console.log(err)
  //         });
  //     } else {
  //         console.log("not enough stock");
  //     }
  // }

  // // Add New Item
  // private addNewItemToCart(cart: IOrderMaster) {
  //     let newDetail = this.createOrderDetail();
  //     cart.orderDetails.push(newDetail);
  //     this.saveCartToLocalStorage(cart);
  //     this.syncCartWithServer(cart);
  // }

  // private addNewItemToCartAPI(cart: IOrderMaster) {
  //     let newDetailRequest: IAddOrderDetail = this.prepareOrderDetailRequest();
  //     this.cartService.addOrderDetail(newDetailRequest, localStorage.getItem("userToken")!).subscribe({
  //         next: res => {
  //             if (res.isSuccess) {
  //                 let newDetail = this.createOrderDetailFromResponse(res.data);
  //                 cart.orderDetails.push(newDetail);
  //                 cart.total += newDetail.detailPrice;
  //                 this.saveCartToLocalStorage(cart);
  //             } else {
  //                 console.log(res.msg);
  //             }
  //         },
  //         error: err => console.log(err)
  //     });
  // }

  // // Add for Guests
  // private addNewItemToLocalCart(cart: IOrderMaster) {
  //     let newDetail = this.createOrderDetail();
  //     cart.orderDetails.push(newDetail);
  //     this.saveCartToLocalStorage(cart);
  //     localStorage.setItem("flag", "true");
  // }

  // // Helper Methods
  // private prepareOrderRequest(cart: IOrderMaster): IUpdateWholeOrder {
  //     return {
  //         id: cart.id,
  //         clientId: cart.clientId,
  //         total: cart.total,
  //         productColorSizeId: cart.orderDetails.map(detail => ({
  //             id: detail.id,
  //             orderMasterId: cart.id,
  //             productId: detail.productColorSizeId,
  //             detailPrice: detail.detailPrice,
  //             quantity: detail.quantity
  //         }))
  //     };
  // }

  // private prepareOrderDetailRequest(): IAddOrderDetail {
  //     return {
  //         orderMasterId: this.getCartFromLocalStorage()!.id,
  //         productId: this.selectedPrdColorSizeId,
  //         detailPrice: this.singlePrdData.price,
  //         quantity: 1
  //     };
  // }

  // private createOrderDetailFromResponse(data: IAddOrderDetailResponseData): IOrderDetail {
  //     return {
  //         id: data.id,
  //         productColorSizeId: data.productId,
  //         detailPrice: data.detailPrice,
  //         quantity: data.quantity,
  //         imagePath: this.selectedPrdColorImage.imagePath,
  //         productName: this.singlePrdData.name,
  //         colorName: this.selectedColorObj.colorName,
  //         sizeNumber: this.selectedPrdColorSize.sizeNumber
  //     };
  // }

  // private saveCartToLocalStorage(cart: IOrderMaster) {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  // }

  // private syncCartWithServer(cart: IOrderMaster) {
  //     this.cartService.updateWholeCart(this.prepareOrderRequest(cart), localStorage.getItem("userToken")!).subscribe({
  //         next: res => {
  //             if (res.isSuccess) localStorage.removeItem("flag");
  //             else console.log(res.msg);
  //         },
  //         error: err => console.log(err)
  //     });
  // }

  // private handleCartResponse(cart: IOrderMaster) {
  //     return {
  //         next: res => {
  //             if (res.isSuccess) {
  //                 cart.id = res.data.id;
  //                 cart.clientId = res.data.clientId;
  //                 cart.orderDetails[0].id = res.data.productColorSizeId[0].id;
  //                 this.saveCartToLocalStorage(cart);
  //             } else {
  //                 console.log(res.msg);
  //             }
  //         },
  //         error: err => console.log(err)
  //     };
  // }


    openAccordion(evt: Event) {
      const btnElement = evt.target as HTMLButtonElement;
      const targetId = btnElement.getAttribute('data-bs-target');
      if (targetId) {
        const collapse = document.querySelector(targetId) as HTMLElement;
        if (collapse) {
          const isShown = collapse.classList.contains('show');
          // Remove 'show' class from all other accordion sections
          console.log(targetId, collapse, isShown, document.querySelectorAll('.accordion-button'))
          document.querySelectorAll('.accordion-collapse').forEach(section => {
            if (section !== collapse) {
              section.classList.remove('show');
            }
          });
          // Toggle the "show" class to activate the transition
          collapse.classList.toggle('show', !isShown);
          // Toggle 'collapsed' class to rotate arrow icon
          btnElement.classList.toggle('collapsed', isShown);
          // Update aria-expanded attribute for accessibility
          btnElement.setAttribute('aria-expanded', (!isShown).toString());
        }
      }
    }
    getProductFromAPI(prdId: number) {
      // this.isDataLoading = true;

      console.log("goiing to get single prd");
      this.productService.getSingleProduct(prdId).subscribe({
        next: (res) => {
          console.log("response received")
          this.singlePrdData = res.data;
          this.prdColors = res.data.prdColors;
          this.selectedPrdColorImages = res.data.prdColors.find(pc => pc["prdColorId"] == res.data.mainColorId)?.prdColorImages ?? [];
          this.selectedPrdColorImage = this.selectedPrdColorImages.find(pci => pci["prdColorImageId"] == res.data.prdColors.find(pc => pc["prdColorId"] == res.data.mainColorId)?.mainImageId)??{} as ISingleProductColorImage;
          this.selectedColorObj = res.data.prdColors.find(pc => pc.prdColorId == res.data.mainColorId) ?? {} as ISingleProductColor;
          this.selectedPrdColorId = this.selectedColorObj.prdColorId;
          this.selectedPrdColorImageId = this.selectedColorObj.mainImageId;
          this.colorSizes = res.data.prdColors.find(pc => pc["prdColorId"] == res.data.mainColorId)?.prdColorSizes ?? [];
          this.isDataLoading = false;
          console.log(this.singlePrdData.reviewsCount)
          console.log("removed loader")
        },
        error: (err) => {
          this.isDataLoading = false;
          this.errors=true;
          console.log(err)
          // here we should redirect some where
        }
      })
    }
  }
