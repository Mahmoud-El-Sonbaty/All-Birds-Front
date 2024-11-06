import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Username } from '../models/username';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsernameServicesService {

  constructor(private httpClient:HttpClient) { }


  
  CreateUser(prd:Username):Observable<Username>{
    return this.httpClient.post<Username>(`${environment.BaseUrl+"/Account/Register"}`,JSON.stringify(prd))
    
      }
      getUserByEmail(email:string):Observable<Username>{

        return this.httpClient.get<Username>(`${environment.BaseUrl+"/Account/Login"}/${email}`);
      }


}
