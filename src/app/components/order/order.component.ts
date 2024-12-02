import { Component, Input } from '@angular/core';
import { Order } from '../../../models/orders';
import { environment } from '../../../environments/environment.development';
import { Route, Router } from '@angular/router';
import { StepperComponent } from '../stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [StepperComponent,CommonModule,TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() order: Order = {} as Order;
  isMenuOpen: boolean = false;

  baseImageUrl: string = environment.baseImageUrl;
  lang:string="en"
  constructor(private router: Router ,language:LanguageService) {
this.lang=language.getLanguage();
  }
  navigateTo(prdId: number) {
    this.router.navigateByUrl(`single-product/${prdId}`);
  }

  togleMenu(){
    const navbarNav = document.getElementById('OrderNav');
    if (navbarNav) {
      navbarNav.classList.toggle('show');
    }


  }


}
