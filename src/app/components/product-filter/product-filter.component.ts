import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges, TrackByFunction } from '@angular/core';
import { IfilterType } from '../../../models/FilterTypes';
import { Icategory } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { RouterLink  } from '@angular/router';
import { IproductColor, IproductSize } from '../../../models/product';
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule , RouterLink ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit , OnChanges{
  @Input() CategorySelected?: Icategory ;
  @Input() filterTypes : IfilterType = {} as IfilterType;
  filterSelected : IfilterType = {} as IfilterType;
  @Output() filterSelectedChange = new EventEmitter<IfilterType>();


  constructor()
  {

  }
  ngOnInit(): void {
    this.filterSelected.SizesNumber = [];
    this.filterSelected.Colors = [];
    this.filterSelected.Category = this.CategorySelected?? {} as Icategory;
    console.log(this.filterTypes.Colors != null || this.filterTypes.SizesNumber != null);

  }
  ngOnChanges(): void {

  }


  updateFilter() {
    this.filterSelectedChange.emit(this.filterSelected);
  }



  FilterBySize(Size : IproductSize)
  {
    this.filterSelected.Category = this.CategorySelected?? {} as Icategory;
    console.log(this.filterSelected.Category.id);
    if (!this.filterSelected.SizesNumber?.some((s) => s.productColorSizeId === Size.productColorSizeId)) {
      this.filterSelected.SizesNumber?.push(Size);
      console.log("Selected Size:", Size);
      this.updateFilter();
  }
}

  FilterByColor(color : IproductColor)
  {
    this.filterSelected.Category = this.CategorySelected?? {} as Icategory;
    console.log(this.filterSelected.Category.id);
    if (!this.filterSelected.Colors?.some((s) => s.code === color.code)) {
      this.filterSelected.Colors?.push(color);
      console.log("Selected Size:", color);
      this.updateFilter();
  }
}
//   RemoveSizeFromFilter(Size : IproductSize)
//   {
//     let index = this.filterSelected.SizesNumber?.findIndex((P) => P.productColorSizeId === Size.productColorSizeId);

//     if (index != -1 && index != undefined) {
//       this.filterSelected.SizesNumber.splice(index, 1);
//       console.log("Selected Size:", Size);

//   }
// }

ClearAll()
{
  this.filterSelected.Colors = [];
  this.filterSelected.SizesNumber = [];
  this.updateFilter();
}
}
