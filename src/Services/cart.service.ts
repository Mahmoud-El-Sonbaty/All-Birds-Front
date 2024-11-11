import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, Subscription } from 'rxjs';
import { IAddOrderDetail, IAddOrderDetailApiResponse, ICartApiResponse, IODetailApiResponse, IUpdateWholeOrder, IUpdateWholeOrderApiResponse } from '../Modules/cart';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CartService  {

  constructor(private httpclient:HttpClient) { }
  getCart(userToken: string):Observable<ICartApiResponse>{
    return this.httpclient.get<ICartApiResponse>(`${environment.BaseUrl}/Order`,{
      headers:{
        'Authorization': "Bearer " + userToken
      }
    });
  }

  updateQuantity(orderDetailId: number, newQuantity: number, userToken: string): Observable<IODetailApiResponse> {
    return this.httpclient.patch<IODetailApiResponse>(`${environment.BaseUrl}/Order/UpdateQuantity`, null, {
      headers: {
        'Authorization': "Bearer " + userToken
      },
      params: {
        orderDetailId: orderDetailId,
        newQuantity: newQuantity
      }
    });
  }

  addOrderDetail(orderDetail: IAddOrderDetail, userToken: string): Observable<IAddOrderDetailApiResponse> {
    return this.httpclient.post<IAddOrderDetailApiResponse>(`${environment.BaseUrl}/order/AddOrderDetail`, orderDetail, {
      headers: {
        'Authorization': "Bearer " + userToken
      }
    })
  }

  updateWholeCart(orderMaster: IUpdateWholeOrder, userToken: string): Observable<IUpdateWholeOrderApiResponse> {
    return this.httpclient.put<IUpdateWholeOrderApiResponse>(`${environment.BaseUrl}/order`, orderMaster, {
      headers: {
        'Authorization': "Bearer " + userToken
      }
    })
  }

  createNewOrder(orderMaster: IUpdateWholeOrder, userToken: string): Observable<IUpdateWholeOrderApiResponse> {
    return this.httpclient.post<IUpdateWholeOrderApiResponse>(`${environment.BaseUrl}/order`, orderMaster, {
      headers: {
        'Authorization': "Bearer " + userToken
      }
    })
  }
}
