import { Component } from '@angular/core';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersData, Order, OrderDetail } from '../../../models/orders'; 

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderComponent,CommonModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  ordersData: OrdersData = {
    data: [
      {
        id: 5,
        clientId: 1,
        clientName: "Mahmoud Elsonbaty",
        clientAddress: "Zaghlool Masood St, Al Zahraa",
        total: 504,
        orderStateId: 1,
        orderStateName: "Cancelled",
        discountAmount: 0,
        discountPercentage: 0,
        dateOrdered: "11/3/2024",
        details: [
          {
            id: 5,
            productId: 77,
            productName: "Men's Wool Runner Go",
            productImagePath: "/images/product-color-images/A10596_Natural_Black_Natural_Black_ANGLE_a3ccbb37-c8e2-4e94-975f-467e544f4717-316.png",
            colorName: "Black",
            sizeNumber: "13.5",
            price: 110,
            detailPrice: 144,
            quantity: 2
          },
          {
            id: 6,
            productId: 173,
            productName: "Men's Wool Piper Go",
            productImagePath: "/images/product-color-images/A10979_24Q3_Wool_Piper_2_Deep_Navy_Natural_White_PDP_SINGLE_3Q-2000x2000_55e869ae-e294-462d-85a9-247a6e2e26b7-933.png",
            colorName: "Blue",
            sizeNumber: "9.5",
            price: 120,
            detailPrice: 360,
            quantity: 3
          }
        ]
      },
      {
        id: 6,
        clientId: 2,
        clientName: "Ali Aloka",
        clientAddress: "15 St, Al Kosh7",
        total: 8000,
        orderStateId: 1,
        orderStateName: "Approved",
        discountAmount: 2000,
        discountPercentage: 20,
        dateOrdered: "25/9/2023",
        details: [
          {
            id: 5,
            productId: 77,
            productName: "Men's Wool Runner Go",
            productImagePath: "/images/product-color-images/A10596_Natural_Black_Natural_Black_ANGLE_a3ccbb37-c8e2-4e94-975f-467e544f4717-316.png",
            colorName: "Black",
            sizeNumber: "13.5",
            price: 110,
            detailPrice: 144,
            quantity: 2
          },
          {
            id: 6,
            productId: 173,
            productName: "Men's Wool Piper Go",
            productImagePath: "/images/product-color-images/A10979_24Q3_Wool_Piper_2_Deep_Navy_Natural_White_PDP_SINGLE_3Q-2000x2000_55e869ae-e294-462d-85a9-247a6e2e26b7-933.png",
            colorName: "Blue",
            sizeNumber: "9.5",
            price: 120,
            detailPrice: 360,
            quantity: 3
          }
        ]
      }
    ],
    isSuccess: true,
    msg: "All Orders For This Client Fetched Successfully"
  };
  selectedYear: number | null = null;
  searchQuery: string = ''; 

  getUniqueOrderYears() {
    const years = this.ordersData.data.map(order => {
      const [day, month, year] = order.dateOrdered.split('/');
      return new Date(`${year}-${month}-${day}`).getFullYear(); // Correct format: yyyy-mm-dd
    });
    return Array.from(new Set(years)); // Remove duplicates
  }

  // Filter orders based on year and search query
  getFilteredOrders() {
    return this.ordersData.data.filter(order => {
      const [day, month, year] = order.dateOrdered.split('/');
      const orderYear = new Date(`${year}-${month}-${day}`).getFullYear();
  
      const selectedYearNumber = this.selectedYear ? Number(this.selectedYear) : null;
  
      // Check if any of the order properties or details match the search query
      const matchesSearch = (field: any) =>
        field.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
  
      // Check order-level fields
      const orderMatches = matchesSearch(order.id) ||
                           matchesSearch(order.clientName) ||
                           matchesSearch(order.clientAddress) ||
                           matchesSearch(order.total) ||
                           matchesSearch(order.orderStateName) ||
                           matchesSearch(order.discountAmount) ||
                           matchesSearch(order.discountPercentage) ||
                           matchesSearch(order.dateOrdered);
  
      // Check product details within the order
      const detailsMatch = order.details.some(detail => 
        matchesSearch(detail.productName) ||
        matchesSearch(detail.price) ||
        matchesSearch(detail.detailPrice) ||
        matchesSearch(detail.colorName)
      );
  
      // Check if it matches the selected year
      const matchesYear = selectedYearNumber ? orderYear === selectedYearNumber : true;
  
      return (orderMatches || detailsMatch) && matchesYear;
    });
  }
  

  // Handle year selection change
  onYearChange() {
    this.searchQuery = '';  // Clear search input when year is selected
  }

}
