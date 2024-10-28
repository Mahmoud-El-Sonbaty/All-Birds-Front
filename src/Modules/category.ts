export interface Icategory {
  catId:number;
  NameEn:string;
  NameAr:string;
  ParentCategoryId:number;
  Level: number;
  IsParentCategory:Boolean;
  Children:Icategory[]|null;

}
export interface ApiResponse {
  IsSuccess: boolean;
  Data: {
    Categories: Icategory[];
  };
  Msg: string;
}
