import { Component,Input } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { Order } from '../../../models/orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [StepperComponent, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() order: Order = {} as Order;
  baseImagePath: string = environment.BaseImagePath;
  constructor(private router: Router) {}
  navigateTo(prdId: number) {
    this.router.navigateByUrl(`single-product/${prdId}`);
  }
}
