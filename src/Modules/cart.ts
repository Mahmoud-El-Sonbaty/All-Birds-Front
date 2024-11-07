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
  colorName: string;
  sizeNumber?: string;
  productName?: string;
  imagePath: string;
}

export interface ICartApiResponse{
  data: IOrderMaster;
  msg: string;
  isSuccess: boolean;
}
