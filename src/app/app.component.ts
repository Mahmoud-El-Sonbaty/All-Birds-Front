import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FooterComponent } from "./Components/footer/footer.component";
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranslateModule,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    // this.translate.setDefaultLang('en');
    this.translate.use('ar');
  }
  title = 'FrontAllbirds';


}
