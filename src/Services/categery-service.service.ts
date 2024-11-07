import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiresponseCategory, ApiresponseoneCategory, Icategory } from '../Modules/category';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategeryServiceService {

  constructor(private httpclient:HttpClient) { }

    getAllCategory():Observable<ApiresponseCategory>{
      console.log(environment.BaseUrl)
      return this.httpclient.get<ApiresponseCategory>(`${environment.BaseUrl}/Category`)
    }


  getCategorysByParentId(categoryId: number):Observable<ApiresponseoneCategory>
  {
    return this.httpclient.get<ApiresponseoneCategory>(`${environment.BaseUrl}/Category/${categoryId}`);

  }

}
