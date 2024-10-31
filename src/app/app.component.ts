import { Component } from '@angular/core';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[CheckoutComponent,ReactiveFormsModule]
})
export class AppComponent {
  title = 'FrontAllbirds';

  
}
