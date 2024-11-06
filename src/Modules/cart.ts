export interface IOrderMaster {
  clientId: number;
  total: number;
  notes: string;
  orderDetails: IOrderDetail[];
}

export interface IOrderDetail {
  id: number;
  quantity: number;
  detailPrice: number;
  notes: string;
  colorNameAr: string;
  colorNameEn: string;
  sizeNumber?: string;
  productNameAr?: string;
  productNameEn?: string;
  imagePath: string;
}

export interface ICartApiResponse{
  data: IOrderMaster;
  msg: string;
  isSuccess: boolean;
}
