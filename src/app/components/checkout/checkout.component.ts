import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,NgxPayPalModule],


})
export class CheckoutComponent implements AfterViewInit ,OnInit{


  @ViewChildren('input') inputFields!: QueryList<ElementRef>;
  checkoutForm: FormGroup;
  showMobileField: boolean = false;

  countryCodes = [
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    // Add more country codes as needed
  ];
  selectedCountryCode = this.countryCodes[0].code; // Default selected country code
  //
  //
  selectedPaymentMethod: string = ''; // Tracks the selected payment method to change bg
  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }
  constructor(private fb: FormBuilder,private renderer:Renderer2) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailOffers: [false, Validators.requiredTrue],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      textOffers: [false],
      mobileNumber: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      //payment 
      paymentMethod: ['creditCard'],  // Default or selected payment method
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{16}$/)  // Only 16 digits
        ]
      ],
      cvv: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}$/)  // Only 3 digits
        ]
      ],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)  // MM/YYYY format
        ]
      ],
      cardName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/)  // Name can contain letters and spaces only
        ]
      ]
    });
  }

  toggleMobileNumberField() {
    this.showMobileField = !this.showMobileField;
    //
     this.showMobileField = this.checkoutForm.get('textOffers')?.value;
    if (this.showMobileField) {
      this.checkoutForm.get('mobileNumber')?.setValidators(Validators.required);
    } else {
      this.checkoutForm.get('mobileNumber')?.clearValidators();
    }
    this.checkoutForm.get('mobileNumber')?.updateValueAndValidity();
  }

  get formControls() {
    return this.checkoutForm.controls;
  }
    //
  

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

// paypal button
payButtonText: string = 'Pay Now'; // Default button text
isPayPalSelected: boolean = false; // Track if PayPal is selected

updatePayButton() {
   const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
   if (paymentMethod === 'paypal') {
      this.payButtonText = 'Pay with PayPal';
      this.isPayPalSelected = true;
   } else {
      this.payButtonText = 'Pay Now';
      this.isPayPalSelected = false;
   }
}

//
paypal: any; // Declare the PayPal variable

public payPalConfig?: IPayPalConfig;

ngOnInit(): void {
    this.initConfig();
    this.renderPayPalButton(); // Render the PayPal button on initialization
}

private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'YOUR_CLIENT_ID_HERE', // Replace with your PayPal client ID
        createOrderOnClient: (data: any) => <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    }
                }
            ]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',    // Label on the button
            layout: 'horizontal',  // Layout type
            color: 'blue',       // Set to blue
            shape: 'rect',       // Rectangular shape
            tagline: false       // Disable the "Powered by PayPal" tagline
        },
        onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
                console.log('Transaction completed by ' + details.payer.name.given_name);
            });
        },
        onCancel: (data: any) => {
            console.log('Transaction was cancelled', data);
        },
        onError: (err: any) => {
            console.error('Error during the transaction', err);
        },
    };
}

// Function to render the PayPal button
private renderPayPalButton() {
    this.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    }
                }]
            });
        },
        // Only allow PayPal funding
        funding: {
            allowed: [this.paypal.FUNDING.PAYPAL], // Only allow PayPal funding
            disallowed: [this.paypal.FUNDING.CARD] // Disallow card funding
        },
        style: {
            label: 'paypal',   // Display "PayPal" on the button
            layout: 'vertical', // Vertical layout
            color: 'blue',      // Blue button
            shape: 'rect',      // Rectangular shape
            tagline: false      // Disable tagline
        },
        onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
                console.log('Transaction completed by ' + details.payer.name.given_name);
            });
        },
        onCancel: (data: any) => {
            console.log('Transaction was cancelled', data);
        },
        onError: (err: any) => {
            console.error('Error during the transaction', err);
        }
    }).render('#paypal-button-container'); // Specify the container ID where the button will be rendered
}
//payment
get f() {
  return this.checkoutForm.controls;
}
restrictNonNumeric(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter'];  // Allow some special keys
  if (allowedKeys.indexOf(event.key) !== -1) {
      return;  // Allow special keys
  }
  
  // Prevent default if the key is not a number
  if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
  }
}

formatExpirationDate(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

  // Handle month and year formatting
  if (value.length >= 2) {
      const month = value.slice(0, 2);
      const year = value.slice(2, 6);

      // Validate the month range (01 to 12)
      if (parseInt(month, 10) > 12) {
          // Set month to 12 if it's greater
          value = '12' + (year ? '/' + year : '');
      } else {
          value = month + (year ? '/' + year : '');
      }
  } else {
      value = value; // Show only MM if less than 2 characters
  }

  // Update the input field and form control
  input.value = value;
  this.checkoutForm.get('expirationDate')?.setValue(value);
}

//floating placeholder
onFocus() {
  this.f['cardName'].markAsTouched(); // Optional: Mark as touched on focus
}



//
  
// paypal button

  submitForm() {
    if (this.checkoutForm.valid) {
      // Proceed with form submission
      console.log('Form submitted', this.checkoutForm.value);
    } else {
      // Mark all controls as touched to show validation errors
      this.checkoutForm.markAllAsTouched();
    }
  }
}