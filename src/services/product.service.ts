import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ApiresponseProduct } from '../models/product';
import { ApiresponsePrd } from '../models/product';
import { ApiFilterBody } from '../models/FilterTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }

  GetTop(Catid:number,numberOfProducts:number):Observable<ApiresponseProduct>{
    return  this.httpclient.get<ApiresponseProduct>(`${environment.BaseUrl}/Product?catId=${Catid}&numberofProduct=${numberOfProducts}`);
  }

  getProductFilter(apiFilterBody : ApiFilterBody):Observable<ApiresponsePrd>
  {
    console.log(apiFilterBody);
    
    return this.httpclient.post<ApiresponsePrd>(`${environment.BaseUrl}/Product/filter` , apiFilterBody );
  }


  getAllProducts(_subCategoryId : number):Observable<ApiresponsePrd>
  {
    return this.httpclient.get<ApiresponsePrd>(`${environment.BaseUrl}/Product/${_subCategoryId}`);
  }


}
