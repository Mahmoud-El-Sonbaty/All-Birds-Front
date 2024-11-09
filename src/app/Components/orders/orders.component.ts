import { Component, OnInit } from '@angular/core';
import { OrderComponent } from '../order/order.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersData, Order, OrderDetail } from '../../../models/orders';
import { OrdersService } from '../../../services/orders.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderComponent,CommonModule,FormsModule,LoaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  isDataLoading: boolean = true;
  ordersData: OrdersData = {
    data: [],
    isSuccess: true,
    msg: "All Orders For This Client Fetched Successfully"
  };
  selectedYear: number | null = null;
  searchQuery: string = '';

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.ordersService.getUserOrders(localStorage.getItem("userToken")!).subscribe({
      next:(res)=>{
        this.isDataLoading = false;
        console.log(res);
        if (res.isSuccess) {
          this.ordersData = res
        }
        else
          console.log(res.msg)
      },
      error:(err)=>{
        this.isDataLoading = false;
        if (err.status == 401) {
          localStorage.removeItem("userToken");
          this.router.navigateByUrl("register");
        }
        console.log(1);
      }
    })
  }
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
