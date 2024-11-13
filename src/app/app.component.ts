import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Language, TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";
import { LanguageService } from '../services/language.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css',
})

export class AppComponent {
  currentLanguage!: string;

  constructor(private languageservice: LanguageService) {
    // this.languageservice.currentLang$.subscribe(lang => {
    //   this.currentLanguage = lang;
    // });
  }
  title = 'FrontAllbirds';
}
