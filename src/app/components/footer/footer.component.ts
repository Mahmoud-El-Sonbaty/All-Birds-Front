import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  lang:any

  /**
   *
   */
  constructor( local:LanguageService) {
    this.lang=local.getLanguage();
  }
}
