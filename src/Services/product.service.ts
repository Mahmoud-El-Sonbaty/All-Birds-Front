import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ApiresponseProduct } from '../Modules/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }

  GetTop(Catid:number,numberOfProducts:number):Observable<ApiresponseProduct>{
    return  this.httpclient.get<ApiresponseProduct>(`${environment.BaseUrl}/Product?catId=${Catid}&numberofProduct=${numberOfProducts}`);
  }
}
