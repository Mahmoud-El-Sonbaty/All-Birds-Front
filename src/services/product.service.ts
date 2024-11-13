import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ApiresponsePrd, ApiresponsePrdSearch, ApiresponseProduct } from '../models/Product';
import { ApiFilterBody } from '../models/FilterTypes';
import { LanguageService } from './language.service';
import { ISingleProductAPIResponse } from '../models/singleProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit ,OnDestroy {
  sub: Subscription = new Subscription();

  constructor(private httpclient:HttpClient,private lang:LanguageService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
}
ngOnInit(): void {
  let item2=this.lang.currentLang$.subscribe();

    this.sub= item2;

}



  GetTop(Catid:number,numberOfProducts:number):Observable<ApiresponseProduct>{
    return  this.httpclient.get<ApiresponseProduct>(`${environment.BaseUrl}/Product/${Catid}/${numberOfProducts}/${this.lang.getLanguage()}`);
  }




  getProductFilter(apiFilterBody : ApiFilterBody):Observable<ApiresponsePrd>
  {
    console.log(apiFilterBody);

    return this.httpclient.post<ApiresponsePrd>(`${environment.BaseUrl}/Product/filter` , apiFilterBody );
  }


  getAllProducts(_subCategoryId : number):Observable<ApiresponsePrd>
  {
    return this.httpclient.get<ApiresponsePrd>(`${environment.BaseUrl}/Product/${_subCategoryId}/${this.lang.getLanguage()}`);
  }



  getProductsByName(ProductName: string):Observable<ApiresponsePrdSearch>
  {
    console.log(ProductName ,this.lang);

    return this.httpclient.get<ApiresponsePrdSearch>(`${environment.BaseUrl}/Product/${ProductName}/${this.lang.getLanguage()}`)
  }
  getSingleProduct(prdId: number): Observable<ISingleProductAPIResponse> {
    return this.httpclient.get<ISingleProductAPIResponse>(`${environment.BaseUrl}/Product/SingleProduct/${prdId}/${this.lang.getLanguage()}`)
  }

}
