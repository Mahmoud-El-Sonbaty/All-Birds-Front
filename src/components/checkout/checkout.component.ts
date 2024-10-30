import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class CheckoutComponent implements AfterViewInit {
  @ViewChildren('input') inputFields!: QueryList<ElementRef>;
  checkoutForm: FormGroup;
  payButtonText: string = 'Pay Now'; // Default button text
  showMobileField: boolean = false; // Toggle mobile number field visibility
  countryCodes = [
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    // Add more country codes as needed
  ];
  selectedCountryCode = this.countryCodes[0].code; // Default selected country code
  //
  isCODSelected: boolean = false; // Track if COD is selected
  isPayPalSelected: boolean = false; // Track if PayPal is selected

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
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

  showPopover = false;

  togglePopover() {
    this.showPopover = !this.showPopover;
  }

  ngAfterViewInit() {
    // Add focus and blur event listeners to all input fields
    this.inputFields.forEach((input) => {
      this.renderer.listen(input.nativeElement, 'focus', () => {
        this.renderer.setStyle(input.nativeElement, 'border', '2px solid black');
      });

      this.renderer.listen(input.nativeElement, 'blur', () => {
        this.renderer.removeStyle(input.nativeElement, 'border');
      });
    });
  }

  submitForm() {
    console.log('Form Submitted', this.checkoutForm.value);
  }
}
