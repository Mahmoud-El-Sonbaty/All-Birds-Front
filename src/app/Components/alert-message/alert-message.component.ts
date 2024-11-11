import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent  {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() isSuccess: boolean = true; // default to true for success messages

  get alertClass() {
    return this.isSuccess ? 'alert-success' : 'alert-danger';
  }
}
