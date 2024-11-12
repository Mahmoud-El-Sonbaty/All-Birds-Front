import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiresponseCategory, ApiresponseoneCategory, Icategory } from '../models/category';
import { environment } from '../environments/environment.development';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CategeryServiceService implements OnInit ,OnDestroy {
  sub: Subscription = new Subscription();
  constructor(private httpclient:HttpClient ,private Lang:LanguageService) { }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  ngOnInit(): void {
    let item2=this.Lang.currentLang$.subscribe( ()=> {
      this.getAllCategory();
    });

      this.sub= item2;

  }

    getAllCategory():Observable<ApiresponseCategory>{
      const lang = this.Lang.getLanguage();

      console.log(`${environment.BaseUrl}/Category/${lang}`)
      return this.httpclient.get<ApiresponseCategory>(`${environment.BaseUrl}/Category/${lang}`)
    }


  getCategorysByParentId(categoryId: number):Observable<ApiresponseoneCategory>
  {
    const lang = this.Lang.getLanguage();
    console.log(`${environment.BaseUrl}/Category/${categoryId}/${lang}`)
    return this.httpclient.get<ApiresponseoneCategory>(`${environment.BaseUrl}/Category/${categoryId}/${lang}`);

  }

}
