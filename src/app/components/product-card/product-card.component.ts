import { IproductColor, IproductSize, IProduct } from './../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; NgbCarouselModule ,
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe , CommonModule ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() Products: IProduct = {} as IProduct;
  BaseImage: string = environment.BaseImagePath;
  mainImagePath? : string;
  PrdSizes! : IproductSize[];

  constructor() {

  }



  ngOnInit(): void {
    this.PrdSizes = this.Products.productColors[0].productSizes;
    this.mainImagePath = this.BaseImage+this.Products.productColors[0].imagePath;
  }

  switchMainImage(newImagePath : string , prdSizes : IproductSize[])
  {
        this.PrdSizes = prdSizes;
        this.mainImagePath = newImagePath;

  }
  getGroups(productColors: IproductColor[]) {
    const groups = [];
    for (let i = 0; i < productColors.length; i += 4) {
      groups.push(productColors.slice(i, i + 4));
    }
    return groups;
  }
  hasMultipleImages(productColors: IproductColor[]): boolean {
    return productColors.filter(color => color.imagePath).length > 0;
  }



}

// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [CurrencyPipe , NgbCarouselModule ],
