import { ApiFilterBody } from './../../../models/FilterTypes';

import { CategeryService } from './../../../services/categery.service';
import { ProductService } from './../../../services/product.service';
import { GlobalThis } from './../../../../server/node_modules/type-fest/source/global-this.d';
import { Component, Input, input, OnChanges, OnInit, SimpleChanges, TrackByFunction } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { IProduct } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../../models/category';
import { IfilterType } from '../../../models/FilterTypes';


@Component({
  selector: 'app-main-product',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent, CommonModule],
  templateUrl: './main-product.component.html',
  styleUrl: './main-product.component.css'
})
export class MainProductComponent implements OnInit, OnChanges {
  public ProductCards!: IProduct[];
  public ParentCat_SubCat?: Icategory;
  public FilterTypes: IfilterType = {} as IfilterType;

  @Input('id') ParentAndSubId: string = '';
  public Msg: string = '';
  subCatId: number = 0;
  sub: Subscription[] = [] as Subscription[];
  filterSelected: IfilterType = {} as IfilterType;
  ApiFilterTypes: ApiFilterBody = {} as ApiFilterBody
  constructor(private productService: ProductService, private route: ActivatedRoute, private categeryService: CategeryService) {

  }

  onFilterSelectedChange(updatedFilter: IfilterType) {

    this.getProductWithFilter(updatedFilter)
  }



  ngOnChanges(): void {

    console.log("changes detected");
    this.getAllCatByParentId(Number(this.ParentAndSubId.split('-')[0]));
    this.subCatId = Number(this.ParentAndSubId.split('-')[1]);

    this.getProductsByCategoryId(Number(this.ParentAndSubId.split('-')[1]));



  }
  ngOnInit(): void {
    this.ApiFilterTypes.colorCode = [];
    this.ApiFilterTypes.sizeNumber = [];
  }



  getProductWithFilter(filtered: IfilterType) {
    console.log("going to api");

    this.ApiFilterTypes.categoryId = filtered.Category.id;
    for (let item of filtered.Colors) {
      this.ApiFilterTypes.colorCode.push(item.code);
    }
    for (let item of filtered.SizesNumber) {
      this.ApiFilterTypes.sizeNumber.push(item.sizeNumber);
    }


    let item = this.productService.getProductFilter(this.ApiFilterTypes).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.ProductCards = res.data;
          console.log(this.ProductCards);

        }
        else {
          this.ProductCards = [];
          this.FilterTypes.Colors = [];
          this.FilterTypes.SizesNumber = [];
          this.Msg = res.msg;

        }
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.sub.push(item);
  }

  getProductsByCategoryId(_subCategoryId: number): void {
    console.log(this.ParentAndSubId)
    let item = this.productService.getAllProducts(_subCategoryId).subscribe({
      next: (res) => {
        this.FilterTypes.Colors = [];
        this.FilterTypes.SizesNumber = [];
        if (!res.isSuccess) {
          this.ProductCards = []
          this.Msg = res.msg;
        }
        else {
          this.ProductCards = res.data;
          console.log(this.ProductCards);


          for (const element of this.ProductCards) {
            element.productColors.filter(P => {
              this.FilterTypes.Colors?.filter(C => {

              })
              if (this.FilterTypes.Colors?.filter(C => C.code == P.code).length == 0) {

                this.FilterTypes.Colors.push(P);
              }
            })
          }



          this.FilterTypes.SizesNumber = Array.from(
            new Map(
              this.ProductCards.flatMap((P) =>
                P.productColors.flatMap((color) => color.productSizes)
              ).map((size) => [size.sizeNumber, size])
            ).values()
          );

        }
      },
      error: (error) => {
        console.log(error);
      }

    })
    this.sub.push(item);
  }


  // Get All Category By Parent Category Id
  getAllCatByParentId(parentCategoryId: number) {
    let item = this.categeryService.getCategorysByParentId(parentCategoryId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          // console.log(res.data);
          this.FilterTypes.Category = res.data;
          this.ParentCat_SubCat = this.FilterTypes.Category.children?.find(child => child.id == this.subCatId);

        }
        else {
          this.Msg = res.msg;
        }
      }
    })
    this.sub.push(item);
  }
  trackById(index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {
    for (const element of this.sub) {
      element.unsubscribe();
    }
  }
}


