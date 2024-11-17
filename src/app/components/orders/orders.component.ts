import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';
import { OrdersData } from '../../../models/orders';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { OrderComponent } from '../order/order.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertMessageComponent } from "../alert-message/alert-message.component";
import { LanguageService } from '../../../services/language.service';
import { UsernameService } from '../../../services/username.service';
import { IUserInfo } from '../../../models/userInfo';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderComponent, CommonModule, FormsModule, LoaderComponent, TranslateModule, AlertMessageComponent],
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
  lang:string="en";
  userInfo!: IUserInfo ;
  UserId:number=0;
  imagepath:string=environment.baseImageUrl;

  constructor(private ordersService: OrdersService, private router: Router,language:LanguageService,private user:UsernameService) {
    this.lang=language.getLanguage();
  }

  ngOnInit(): void {
    this.ordersService.getUserOrders(localStorage.getItem("userToken")!).subscribe({
      next:(res)=>{
        this.isDataLoading = false;
        console.log(res);
        if (res.isSuccess) {
          this.ordersData = res
          console.log(res.data)
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
        console.log(err);
      }
    })

    this.user.GetUserDetails(1).subscribe({
      next:(res)=>{
        this.isDataLoading = false;
        console.log(res);
        if (res.isSuccess) {
          this.userInfo = res.data
          console.log(res.data)
        }
        else
          console.log(res.msg)
      },
      error:(err)=>{
        this.isDataLoading = false;
        console.log(err);
      }
    })
  }
  getUniqueOrderYears() {
    const years = this.ordersData.data.map(order => {
      if (order.dateOrdered != null) {
        const [day, month, year] = order.dateOrdered.split('/');
        return new Date(`${year}-${month}-${day}`).getFullYear(); // Correct format: yyyy-mm-dd
      }
      else {
        return new Date().getFullYear();
      }
    });
    return Array.from(new Set(years)); // Remove duplicates
  }

  // Filter orders based on year and search query
  getFilteredOrders() {
    return this.ordersData.data.filter(order => {
      let orderYear;
      if (order.dateOrdered != null) {
        const [day, month, year] = order.dateOrdered.split('/');
        orderYear = new Date(`${year}-${month}-${day}`).getFullYear();
      }
      else {
        const [day, month, year] = new Date().toDateString().split('/');
        orderYear = new Date(`${year}-${month}-${day}`).getFullYear();
      }
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
