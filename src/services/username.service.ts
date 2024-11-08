import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Username } from '../models/username';
import { environment } from '../environments/environment.development';
import { UsernameCheck } from '../models/username-check';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private httpClient:HttpClient) { }

  register(user: Username):Observable<Username>{
    return this.httpClient.post<Username>(`${environment.BaseUrl}/Account/Register`, user)
  }

  getUserByEmail(loginCredentials: UsernameCheck):Observable<string>{
    return this.httpClient.post<string>(`${environment.BaseUrl}/account/login`,
      loginCredentials,
      { responseType: 'text' as 'json' }
    );
  }
}
