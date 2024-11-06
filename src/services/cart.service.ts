import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ICartApiResponse } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient:HttpClient) { }
  getCart(userToken: string):Observable<ICartApiResponse>{
    return this.httpclient.get<ICartApiResponse>(`${environment.BaseUrl}/Order`,
      {
        headers:{
          'Authorization': "Bearer " + userToken
        }
      }
    );
  }
}
