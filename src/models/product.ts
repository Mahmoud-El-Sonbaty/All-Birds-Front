export interface IProduct {
  id: number;
  nameEn: string;
  nameAr: string;
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
  nameEn : string
  nameAr : string
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
