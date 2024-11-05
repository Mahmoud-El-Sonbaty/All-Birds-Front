export interface Icategory {
  id: number;
  nameEn: string;
  nameAr: string;
  parentCategoryId: number;
  level: number;
  isParentCategory: Boolean;
  children: Icategory[]|null;
}

export interface ApiresponseCategory{
  data: Icategory[];
  msg: string;
  isSuccess: boolean;
}
