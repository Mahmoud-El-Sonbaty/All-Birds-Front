export interface IProduct {
    id: number;
    nameEn: string;
    nameAr: string;
    price: number;
    productColors: IproductColor[];
  }
  
  export interface Iproduct {
    id:number,
    mainImagePath :string
    price :number
    colorNameEn :string
    colorNameAr :string
    nameAr :string
    nameEn :string
  
  }
  
  export interface ApiresponseProduct{
    data:Iproduct[];
    msg:string;
    isSuccess:boolean;
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
  