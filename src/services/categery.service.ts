import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiresponse, Icategory } from '../models/category';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategeryService {

  constructor(private httpclient:HttpClient) { }

getAllCategory():Observable<Apiresponse>{
  console.log(environment.BaseUrl)
  return this.httpclient.get<Apiresponse>(`${environment.BaseUrl}/Category`)
}
getCategoryById(id:number):Observable<Apiresponse>{
  return this.httpclient.get<Apiresponse>(`${environment.BaseUrl}`,{
    params:{
      "Id":id
    }
  })

}
}
