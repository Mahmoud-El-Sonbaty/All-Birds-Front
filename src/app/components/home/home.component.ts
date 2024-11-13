import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SliderCmComponent } from '../slider-cm/slider-cm.component';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../../models/Product';
import { error } from 'jquery';
import { environment } from '../../../environments/environment.development';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SliderCmComponent,TranslateModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {

  sub:Subscription[]= []as Subscription[];
  Products:Iproduct[]=[]as Iproduct[];
  imagepath:string=environment.BaseIMageUrl;
  lang!:string;
  constructor(private Product: ProductService, private translate: TranslateService ,language:LanguageService,private router:Router ) {
    this.lang=language.getLanguage();
  }

  ngOnInit(): void {

    this.translate.get([
      'home.3cards.card1.title',
      'home.3cards.card1.subtitle',
      'home.3cards.card2.title',
      'home.3cards.card2.subtitle',
      'home.3cards.card3.title',
      'home.3cards.card3.subtitle',

      'home.slider2.slide1.card1',
      'home.slider2.slide1.card2',
      'home.slider2.slide2.card1',
      'home.slider2.slide2.card2',
      'home.slider2.slide3.card1',
      'home.slider2.slide3.card2'
    ]).subscribe(translations => {
      this.items = [
        {
          type: 'image',
          src: 'images/slide1-image1.jpg',
          title: translations['home.3cards.card1.title'],
          subtitle: translations['home.3cards.card1.subtitle']
        },
        {
          type: 'video',
          src: 'images/video.webm',
          title: translations['home.3cards.card2.title'],
          subtitle: translations['home.3cards.card2.subtitle']
        },
        {
          type: 'image',
          src: 'images/slide1-image2.jpg',
          title: translations['home.3cards.card2.title'],
          subtitle: translations['home.3cards.card3.subtitle']
        }
      ];
      this.slides2 = [
        {
          img: 'images/slide2-image1.jpg',
          img2: 'images/slide2-image2.jpg',
          text: translations['home.slider2.slide1.card1'],
          text2: translations['home.slider2.slide1.card2'],
          rootVal1: "2-6",
          rootVal2: "18-23",
          active: true
        },
        {
          img: 'images/slide2-image3.jpg',
          img2: 'images/slide2-image4.jpg',
          text: translations['home.slider2.slide2.card1'],
          text2: translations['home.slider2.slide2.card2'],
          rootVal1: "2-4",
          rootVal2: "17-19",
          active: false
        },
        {
          img: 'images/slide2-image5.jpg',
          img2: 'images/slide2-image6.jpg',
          text: translations['home.slider2.slide3.card1'],
          text2: translations['home.slider2.slide3.card2'],
          rootVal1: "2-3",
          rootVal2: "17-18",

          active: false
        }
      ];
    });

    // تحميل المنتجات من الخدمة
    const pr = this.Product.GetTop(1, 4).subscribe({
      next: (res) => {
        this.Products = res.data;
        console.log(this.Products);
      },
      error: (er) => {
        console.log(er);
      }
    });
    this.sub.push(pr);
  }

      ngOnDestroy(): void {
        for (const element of this.sub) {
          element.unsubscribe();
      }
  }

  navigateTo(rootValue: string, flag: number) {
    switch (flag) {
      case 1:// this means to navigate to category product
        this.router.navigateByUrl(`ProductCategory/${rootValue}`);
        break;
      case 2: // this means to navigate to a single product details
        this.router.navigateByUrl(`single-product/${rootValue}`)
        break;
      default:
        break;
    }
  }

  // slides2 = [
  //   { img: 'images/slide2-image1.jpg', img2: 'images/slide2-image2.jpg', text: "Men's season ready", text2: "Women's Fall Essentials", active: true },
  //   { img: 'images/slide2-image3.jpg', img2: 'images/slide2-image4.jpg', text: "Men's Sporty Styles", text2: "Women's Athleisure Styles", active: false },
  //   { img: 'images/slide2-image5.jpg', img2: 'images/slide2-image6.jpg', text: "Men's Lightweight Styles", text2: "Women's Packable Shoes", active: false }
  // ];
  slides2 = [
    { img: 'images/slide2-image1.jpg',img2: 'images/slide2-image2.jpg', rootVal1: "2-6", rootVal2: "18-23", text: "Men's season ready" , text2: "Women's Fall Essentials", active:true },
    { img: 'images/slide2-image3.jpg',img2: 'images/slide2-image4.jpg', rootVal1: "2-4", rootVal2: "17-19", text: "Men's Sporty Styles" , text2: "Women's Athleisure Styles" , active:false },
    { img: 'images/slide2-image5.jpg',img2: 'images/slide2-image6.jpg', rootVal1: "2-3", rootVal2: "17-18", text: "Men's Lightweight Styles" , text2: "Women's Packable Shoes" , active:false },
  ];
  items = [
    { type: 'image', src: 'images/slide1-image1.jpg', title: '', subtitle: '' },
    { type: 'video', src: 'images/video.webm', title: '', subtitle: '' },
    { type: 'image', src: 'images/slide1-image2.jpg', title: '', subtitle: '' }
  ];


  trackById(index: number, product: any) {
    return product.id;
  }


}
