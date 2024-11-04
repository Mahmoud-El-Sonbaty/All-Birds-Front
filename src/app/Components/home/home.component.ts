import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SliderCmComponent } from './slider-cm/slider-cm.component';
import { CategeryServiceService } from '../../../Services/categery-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SliderCmComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private category:CategeryServiceService) {
    super();

  }
  slides2 = [
    { img: 'images/slide2-image1.jpg',img2: 'images/slide2-image2.jpg', text: "Men's season ready" , text2: "Women's Fall Essentials", active:true },
    { img: 'images/slide2-image3.jpg',img2: 'images/slide2-image4.jpg', text: "Men's Sporty Styles" , text2: "Women's Athleisure Styles" , active:false },
    { img: 'images/slide2-image5.jpg',img2: 'images/slide2-image6.jpg', text: "Men's Lightweight Styles" , text2: "Women's Packable Shoes" , active:false },
  ];


  items = [
    {
      type: 'image',
      src: 'images/slide1-image1.jpg',
      title: 'Wool Runner Go',
      subtitle: 'Sublimely Soft, Everyday Elevated'
    },
    {
      type: 'video',
      src: 'images/video.webm',
      title: 'Wool Runner Mizzle',
      subtitle: 'Weather-ready, Everyday Sneaker'
    },
    {
      type: 'image',
      src: 'images/slide1-image2.jpg',
      title: 'Tree Topper',
      subtitle: 'Breezy High-Top Sneakers'
    }
  ];




}
