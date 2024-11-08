export interface OrderDetail {
  id: number;
  productId: number;
  ProductColorSizeId: number;
  productName: string;
  productImagePath: string;
  colorName: string;
  sizeNumber: string;
  price: number;
  detailPrice: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderNo: string;
  clientId: number;
  clientName: string;
  clientAddress: string;
  total: number;
  orderStateId: number;
  orderStateName: string;
  discountAmount: number;
  discountPercentage: number;
  dateOrdered: string;
  details: OrderDetail[];
}

export interface OrdersData {
  data: Order[];
  isSuccess: boolean;
  msg: string;
}
