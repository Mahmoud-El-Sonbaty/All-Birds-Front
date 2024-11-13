export interface Icategory {
  id:number;
  name:string;
  parentCategoryId:number;
  level: number;
  isParentCategory:Boolean;
  children:Icategory[]|null;

}
export interface ApiresponseCategory{

  data:Icategory[];
  msg:string;
  isSuccess:boolean;
}
export interface ApiresponseoneCategory{

  data:Icategory;
  msg:string;
  isSuccess:boolean;
}
