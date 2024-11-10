export interface ISingleProduct {
  id: number;
  name: string;
  price: number;
  highlights: string;
  sustainability: string;
  sustainableMaterials: string;
  shippingAndReturns: string;
  careGuide: string;
  discount: number;
  freeShipping: boolean;
  mainColorId: number;
  prdColors: ISingleProductColor[];
  specifications: ISingleProductSpecifications[];
  details: ISingleProductDetails[];
}

export interface ISingleProductColor {
  prdColorId: number;
  colorName: string;
  colorCode: string;
  mainImageId: number;
  prdColorImages: ISingleProductColorImage[]
}

export interface ISingleProductColorImage {
  prdColorImageId: number;
  imagePath: string;
}

export interface ISingleProductColorSize {
  productColorSizeId: number
  sizeNumber: string
  unitsInStock: number
}

export interface ISingleProductAPIResponse {
  isSuccess: boolean;
  data: ISingleProduct;
  msg: string;
}

export interface ISingleProductSpecifications {
  specId: number;
  name: string;
  content: string;
}

export interface ISingleProductDetails {
  prdDetailId: number;
  title: string;
  description: string;
  imagePath: string;
}

