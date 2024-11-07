import { AfterViewInit, Component ,OnDestroy,OnInit,} from '@angular/core';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../../Modules/Product';
import { ProductService } from '../../../Services/product.service';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare var $: any;

@Component({
  selector: 'app-slider-cm',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './slider-cm.component.html',
  styleUrl: './slider-cm.component.css'
})
export class SliderCmComponent implements  AfterViewInit,OnDestroy,OnInit {

  sub:Subscription[]= []as Subscription[];
  Products:Iproduct[]=[]as Iproduct[];
  imagepath:string=environment.BaseIMageUrl;
  customOptions!: OwlOptions;

  // customOptions: OwlOptions = {
  //   loop: false,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   margin:1,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     },
  //     1200: {
  //       items: 6
  //     },
  //     1400: {
  //        items: 8
  //     }

  //   },
  //   nav: true,
  //   navText:[`<i class="bi bi-chevron-left" id="LeftICON"></i>`,`<i class="bi bi-chevron-right"  id="RightICON"></i>`]
  // }





  constructor(private Product:ProductService) {

  }
  ngOnDestroy(): void {
    for (const element of this.sub) {
      element.unsubscribe();
  }
  }
  ngOnInit(): void {
    var pr = this.Product.GetTop(1,4).subscribe(
      {
        next:(res)=>{
          this.Products=res.data;
        },
        error:(er)=>{

          console.log(er);
        }
      }
    );
    this.sub.push(pr);

    this.customOptions = {
      loop: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      rewind:false,
      margin: 1,
      responsive: {
        0: { items: 1 },
        400: { items: 2 },
        740: { items: 3 },
        940: { items: 4 },
        1200: { items: 6 },
        1400: { items: 8 }
      },
      nav: true,
      navText: [
        `<i class="bi bi-chevron-left" id="LeftICON"></i>`,
        `<i class="bi bi-chevron-right" id="RightICON"></i>`
      ]
    };

  }


  ngAfterViewInit(): void {


  }
}
