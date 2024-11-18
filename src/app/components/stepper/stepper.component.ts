import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements OnInit {
  @Input() orderState!: string;
  steps: string[] = ["In Cart", "Pending", "Approved", "Processing", "Out for Delivery", "Deliverd"];
  cancelled: string = '';
  constructor(private translate: TranslateService) {
  }
  ngOnInit(): void {
    this.translate.get([
      'stepper.pending',
      'stepper.approved',
      'stepper.processing',
      'stepper.out_for_delivery',
      'stepper.delivered',
      'stepper.cancelled',
    ]).subscribe(translations => {
      this.steps = [
        translations['stepper.pending'],
        translations['stepper.approved'],
        translations['stepper.processing'],
        translations['stepper.out_for_delivery'],
        translations['stepper.delivered']
      ];
      this.cancelled = translations['cancelled'];
    })
  }

  isComplete(step: string): boolean {
    return this.steps.indexOf(step) < this.steps.indexOf(this.orderState);
  }

  isActive(step: string): boolean {
    return step === this.orderState;
  }

  isCanceled(): boolean {
    return this.orderState === this.cancelled;
  }
}
