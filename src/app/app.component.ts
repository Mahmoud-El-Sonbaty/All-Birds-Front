import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ProductDetailsComponent } from "./Components/product-details/product-details.component";
import { TranslationService } from '../services/translation.service';
import { SocksComponent } from "./Components/socks/socks.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, ProductDetailsComponent, SocksComponent, CheckoutComponent],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'FrontAllbirds';
  constructor(private translationService: TranslationService) {}

  toggleDirection(): void {
    this.translationService.toggleDirection();
  }

  getDirection(): string {
    return this.translationService.getCurrentDirection();
  }
}