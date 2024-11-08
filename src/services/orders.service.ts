import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersData } from '../models/orders';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpclient: HttpClient) { }

  getUserOrders(userToken: string):Observable<OrdersData>{
    return this.httpclient.get<OrdersData>(`${environment.BaseUrl}/Order/getallclientorders`,{
      headers:{
        'Authorization': "Bearer " + userToken
      }
    });
  }
}
