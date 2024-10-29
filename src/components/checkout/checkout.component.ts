import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  payButtonText: string = 'Pay Now'; // Default button text
  showMobileField: boolean = false; // Toggle mobile number field visibility
  countryCodes = [
    { name: 'United States', code: '+1' },
    { name: 'Canada', code: '+1' },
    // Add more country codes as needed
  ];
  selectedCountryCode: string = this.countryCodes[0].code; // Default selected country code
  isCODSelected: boolean = false; // Track if COD is selected
  isPayPalSelected: boolean = false; // Track if PayPal is selected

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      email: [''],
      emailOffers: [false],
      textOffers: [false],
      mobileNumber: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      paymentMethod: ['creditCard'],
      cardNumber: [''],
      expirationDate: [''],
      securityCode: [''],
      nameOnCard: ['']
    });
  }

  toggleMobileNumberField() {
    this.showMobileField = !this.showMobileField;
  }

  updatePayButton() {
    const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
    if (paymentMethod === 'paypal') {
      this.payButtonText = 'Pay with PayPal';
      this.isPayPalSelected = true;
    } else {
      this.payButtonText = 'Pay Now';
      this.isPayPalSelected = false;
    }
    this.isCODSelected = paymentMethod === 'cod';
  }

  //
  showPopover = false;

togglePopover() {
    this.showPopover = !this.showPopover;
}

  //
  submitForm() {
    console.log('Form Submitted', this.checkoutForm.value);
  }
}
