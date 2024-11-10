import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { ISingleProduct, ISingleProductColor, ISingleProductColorImage, ISingleProductColorSize } from '../../../models/singleProduct';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './product-details.component.html',
//   template: `
//   <button (click)="toggleDirection()">
//     Switch to {{ getDirection() === 'rtl' ? 'English' : 'Arabic' }}
//   </button>
//   <router-outlet></router-outlet>
// `,
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
  isDataLoading: boolean = true;
  baseImagePath: string = environment.BaseImagePath;
  singlePrdData: ISingleProduct = {} as ISingleProduct;
  colorSizes: ISingleProductColorSize[] = [];
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
    console.log("changing");
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

  constructor(private productService: ProductService, private router: Router) { }

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
  // addAccordiansEventListener() {
    // setTimeout(() => {
    //   const accordionButtons = document.querySelectorAll('accordion-button');
    //   console.log(accordionButtons.length)
    //   console.log(accordionButtons);
      
    // }, 3000);
    // let accordsLen = accordionButtons.length;
    // console.log(accordsLen);
    // for (let i = 0; i < accordsLen; i++) {
    //   console.log(i, "in foooor")
    //   const btnElement = accordionButtons[i] as HTMLButtonElement;
    //   console.log(btnElement)
    // }
    // accordionButtons.forEach((button) => {
    //   const btnElement = button as HTMLButtonElement;
    //   btnElement.addEventListener('click', () => {
    //     const targetId = btnElement.getAttribute('data-bs-target');
    //     if (targetId) {
    //       const collapse = document.querySelector(targetId) as HTMLElement;
    //       if (collapse) {
    //         const isShown = collapse.classList.contains('show');
    //         // Remove 'show' class from all other accordion sections
    //         document.querySelectorAll('.accordion-collapse').forEach(section => {
    //           if (section !== collapse) {
    //             section.classList.remove('show');
    //           }
    //         });
    //         // Toggle the "show" class to activate the transition
    //         collapse.classList.toggle('show', !isShown);
    //         // Toggle 'collapsed' class to rotate arrow icon
    //         btnElement.classList.toggle('collapsed', isShown);
    //         // Update aria-expanded attribute for accessibility
    //         btnElement.setAttribute('aria-expanded', (!isShown).toString());
    //       }
    //     }
    //   });
    // });
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
    console.log("goiing to get single prd");
    this.productService.getSingleProduct(prdId).subscribe({
      next: (res) => {
        this.singlePrdData = res.data;
        this.prdColors = res.data.prdColors;
        this.selectedPrdColorImages = res.data.prdColors.find(pc => pc["prdColorId"] == res.data.mainColorId)?.prdColorImages ?? [];
        this.selectedPrdColorImage = this.selectedPrdColorImages.find(pci => pci["prdColorImageId"] == res.data.prdColors.find(pc => pc["prdColorId"] == res.data.mainColorId)?.mainImageId)??{} as ISingleProductColorImage;
        this.selectedColorObj = res.data.prdColors.find(pc => pc.prdColorId == res.data.mainColorId) ?? {} as ISingleProductColor;
        this.selectedPrdColorId = this.selectedColorObj.prdColorId;
        this.selectedPrdColorImageId = this.selectedColorObj.mainImageId;
        // console.log(this.singlePrdData.specifications.slice(1))
        console.log(res.data.careGuide.split("\r\n").filter(c => c != ""));
        this.isDataLoading = false;
        console.log("try get query selector after api data recieved at line 326")
        // console.log(document.querySelectorAll('.accordion-button'));
        // this.addAccordiansEventListener();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
