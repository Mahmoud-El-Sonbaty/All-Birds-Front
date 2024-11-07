import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, Subscription } from 'rxjs';
import { ICartApiResponse } from '../Modules/cart';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit ,OnDestroy {
  sub: Subscription = new Subscription();

  constructor(private httpclient:HttpClient, private Lang:LanguageService) { }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  ngOnInit(): void {
    let item2=this.Lang.currentLang$.subscribe( ()=> {

    });

      this.sub= item2;

  }
  getCart(userToken: string):Observable<ICartApiResponse>{
    return this.httpclient.get<ICartApiResponse>(`${environment.BaseUrl}/Order/${this.Lang.getLanguage()}`,
      {
        headers:{
          'Authorization': "Bearer " + userToken
        }
      }
    );
  }}
