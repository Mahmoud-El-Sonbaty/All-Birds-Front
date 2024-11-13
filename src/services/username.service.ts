import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Username } from '../models/username';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { UsernameCheck } from '../models/username-check';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private httpClient:HttpClient) { }

  register(user:Username):Observable<Username>{
    return this.httpClient.post<Username>(`${environment.BaseUrl}/account/register`, user)
  }

  getUserByEmail(loginCredentials: UsernameCheck):Observable<string>{
    return this.httpClient.post<string>(`${environment.BaseUrl}/account/login`,
      loginCredentials,
      { responseType: 'text' as 'json' }
    );
  }}
