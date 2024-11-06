import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages:BehaviorSubject<string>
  constructor() {

    this.languages= new BehaviorSubject<string>('en');
   }
   Getlanguage():Observable<string>{
    return this.languages.asObservable()
   }
   changLanguage(newvalue:string){
    this.languages.next(newvalue)
   }
}
