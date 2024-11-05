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
