import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../Modules/category';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategeryServiceService {

  constructor(private httpclient:HttpClient) { }

getAllCategory():Observable<Icategory[]>{
  console.log(environment.BaseUrl)
  return this.httpclient.get<Icategory[]>(`${environment.BaseUrl}/Categories`)
}
getCategoryById(id:number):Observable<Icategory>{
  return this.httpclient.get<Icategory>(`${environment.BaseUrl}/Categories`,{
    params:{
      "Id":id
    }
  })

}
}
