import { AfterViewInit, Component ,Renderer2} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-slider-cm',
  standalone: true,
  imports: [],
  templateUrl: './slider-cm.component.html',
  styleUrl: './slider-cm.component.css'
})
export class SliderCmComponent implements  AfterViewInit {
  ngAfterViewInit(): void {
    // قم بتهيئة Owl Carousel مباشرةً بعد التحميل
    $('.owl-carousel').owlCarousel({
      loop: false,
      margin: 5,
      nav: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        900: { items: 4 },
        1200: { items: 6 },
        1400: { items: 8 },
        1600: { items: 10 },
        1900: { items: 12 },
      }
    });
  }
}
