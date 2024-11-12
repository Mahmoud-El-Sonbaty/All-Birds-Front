import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  /**
   *
   */
  constructor(private route:Router) {

  }
  get alertClass() {
    return this.isSuccess ? 'alert-success' : 'alert-danger';
  }
  clossing(){
    this.route.navigate(['/home'])
  }
}
