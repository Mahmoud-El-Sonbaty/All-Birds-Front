import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,NgxPayPalModule]
})
export class CheckoutComponent implements AfterViewInit ,OnInit{
  @ViewChildren('input') inputFields!: QueryList<ElementRef>;
  checkoutForm: FormGroup;
  showMobileField: boolean = false; // Toggle mobile number field visibility
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
            layout: 'vertical',  // Layout type
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

  
// paypal button

  submitForm() {
    console.log('Form Submitted', this.checkoutForm.value);
  }
}
