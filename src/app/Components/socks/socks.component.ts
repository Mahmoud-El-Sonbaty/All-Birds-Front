import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-socks',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './socks.component.html',
  styleUrls: ['./socks.component.css']
})
export class SocksComponent {
  heading = 'Ankle Socks';
  description = 'Designed to keep you comfortable for workouts or work.';
  titleAdd='Quick Add';
  products = [
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
    { title: 'Anytime Ankle Sock', color: 'Deep Navy', price: '$16', image: 'Images/Socks-images/s1.jpg' },
  ];
  
   // Array to repeat the whole block 5 times
   repetitions = [1, 2, 3, 4, 5];




  //
  // Accordion functionality
  ngAfterViewInit(): void {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach((button) => {
      const btnElement = button as HTMLButtonElement;

      btnElement.addEventListener('click', () => {
        const targetId = btnElement.getAttribute('data-bs-target');

        if (targetId) {
          const collapse = document.querySelector(targetId) as HTMLElement;

          if (collapse) {
            const isShown = collapse.classList.contains('show');

            // Remove 'show' class from all other accordion sections
            document.querySelectorAll('.accordion-collapse').forEach(section => {
              if (section !== collapse) {
                section.classList.remove('show');
              }
            });

            // Toggle the "show" class to activate the transition
            collapse.classList.toggle('show', !isShown);

            // Toggle 'collapsed' class to rotate arrow icon
            btnElement.classList.toggle('collapsed', isShown);

            // Update aria-expanded attribute for accessibility
            btnElement.setAttribute('aria-expanded', (!isShown).toString());
          }
        }
      });
    });
  }  
}
