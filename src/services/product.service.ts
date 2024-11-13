import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiresponsePrd, ApiresponsePrdSearch } from '../models/product';
import { ApiFilterBody } from '../models/FilterTypes';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient : HttpClient) { }

  getProductFilter(apiFilterBody : ApiFilterBody):Observable<ApiresponsePrd>
  {
    console.log(apiFilterBody);
    
    return this.httpclient.post<ApiresponsePrd>(`${environment.BaseUrl}/Product/filter` , apiFilterBody );
  }


  getAllProducts(_subCategoryId : number):Observable<ApiresponsePrd>
  {
    return this.httpclient.get<ApiresponsePrd>(`${environment.BaseUrl}/Product/${_subCategoryId}`);
  }

  getProductsByName(ProductName: string, Lang: string):Observable<ApiresponsePrdSearch>
  {
    console.log(ProductName , Lang);
    
    return this.httpclient.get<ApiresponsePrdSearch>(`${environment.BaseUrl}/Product/${ProductName}/${Lang}`)
  }

}
