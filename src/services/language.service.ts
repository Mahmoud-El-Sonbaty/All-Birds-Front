import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.currentLang.next(lang);
    this.setDirection(lang);

  }

  toggleLanguage() {
    const newLang = this.getLanguage() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
  setDirection(lang: string) {
    if (lang === 'ar') {
      document.documentElement.style.direction = 'rtl';
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.style.direction = 'ltr';
      document.documentElement.setAttribute('lang', 'en');
    }
  }
  // جلب اللغة الحالية
  getLanguage() {
    return this.currentLang.value;
  }
}
