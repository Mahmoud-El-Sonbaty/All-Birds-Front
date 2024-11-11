export interface IOrderMaster {
  id: number;
  clientId: number;
  total: number;
  notes?: string;
  orderDetails: IOrderDetail[];
}

export interface IOrderDetail {
  id: number;
  productColorSizeId: number;
  quantity: number;
  detailPrice: number;
  notes?: string;
  // colorNameAr: string;
  colorName: string;
  sizeNumber?: string;
  // productNameAr?: string;
  productName?: string;
  imagePath: string;
}

export interface IAddOrderDetail {
  orderMasterId: number;
  productId: number;
  detailPrice: number;
  quantity: number;
}

export interface IAddOrderDetailResponseData {
  id: number;
  orderMasterId: number;
  productId: number;
  detailPrice: number;
  quantity: number;
  notes?: string;
}

export interface IUpdateWholeOrder {
  id: number;
  clientId: number;
  total: number;
  productColorSizeId: IAddOrderDetailResponseData[]
}

export interface IUpdateWholeOrderApiResponse {
  data: IUpdateWholeOrder;
  isSuccess: boolean;
  msg: string;
}

export interface IAddOrderDetailApiResponse {
  data: IAddOrderDetailResponseData;
  isSuccess: boolean;
  msg: string;
}

export interface ICartApiResponse {
  data: IOrderMaster;
  msg: string;
  isSuccess: boolean;
}

export interface IODetailApiResponse {
  data: IOrderDetail;
  msg: string;
  isSuccess: boolean;
}
