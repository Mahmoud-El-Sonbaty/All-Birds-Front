import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @Input() orderState!: string;
  steps: string[] = ["In Cart", "Pending", "Approved", "Processing","Out for Delivery","Deliverd"];

  isComplete(step: string): boolean {
    return this.steps.indexOf(step) < this.steps.indexOf(this.orderState);
  }

  isActive(step: string): boolean {
    return step === this.orderState;
  }

  isCanceled(): boolean {
    return this.orderState === 'Cancelled';
  }
}
