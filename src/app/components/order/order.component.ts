import { Component, Input } from '@angular/core';
import { Order } from '../../../models/orders';
import { environment } from '../../../environments/environment.development';
import { Route, Router } from '@angular/router';
import { StepperComponent } from '../stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [StepperComponent,CommonModule,TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() order: Order = {} as Order;
  baseImageUrl: string = environment.baseImageUrl;
  constructor(private router: Router) {}
  navigateTo(prdId: number) {
    this.router.navigateByUrl(`single-product/${prdId}`);
  }
}
