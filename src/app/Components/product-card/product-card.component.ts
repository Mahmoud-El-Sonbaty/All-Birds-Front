import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IproductColor, IproductSize } from '../../../Modules/Product';
import { environment } from '../../../environments/environment.development';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe,CommonModule,TranslateModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit  {


  @Input() Products: IProduct = {} as IProduct;
  BaseImage: string = environment.BaseIMageUrl;
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

