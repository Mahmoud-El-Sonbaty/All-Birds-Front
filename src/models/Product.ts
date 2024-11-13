export interface Iproduct {
   id:number,
   mainImagePath :string
   price :number
   colorName :string
   name :string

}
export interface ApiresponseProduct{

  data:Iproduct[];
  msg:string;
  isSuccess:boolean;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  productColors: IproductColor[];
}

export interface ApiresponsePrd {
  msg: string;
  isSuccess: boolean;
  data: IProduct[];
}

export interface IproductColor
{
  productColorId : number;
  imagePath :string;
  name : string
  code: string
  productSizes :IproductSize[];
}

export interface IproductSize {
  productColorSizeId: number;
  sizeNumber: string;
  unitsInStock : number;
}


export interface IproductSearch{
  id :number;
  mainImagePath : string;
  colorName : string;
  name : string
  price : number
}

export interface ApiresponsePrdSearch {
  msg: string;
  isSuccess: boolean;
  data: IproductSearch[];
}
