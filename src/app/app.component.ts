import { Component, NgModule } from '@angular/core';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[CheckoutComponent,ReactiveFormsModule,FormsModule],

})

export class AppComponent {
  title = 'FrontAllbirds';

  
}
