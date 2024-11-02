import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Username } from '../model/username';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsernameServicesService {

  constructor(private httpClient:HttpClient) { }


  
  CreateUser(prd:Username):Observable<Username>{
    return this.httpClient.post<Username>(`${environment.BaseUrl}`,JSON.stringify(prd))
    
      }
      getUserByEmail(email:string):Observable<Username>{

        return this.httpClient.get<Username>(`${environment.BaseUrl}/${email}`);
      }


}
