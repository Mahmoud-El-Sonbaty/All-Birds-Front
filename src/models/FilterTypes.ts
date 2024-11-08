import { Icategory } from "./category";
import { IproductColor, IproductSize } from "./product";

export interface IfilterType
{
  Category : Icategory;

  Colors : IproductColor[];
  SizesNumber : IproductSize[];

}
export interface ApiFilterBody{
  categoryId: number;
  sizeNumber: string[];
  colorCode: string[];
  // price : number[];
}
