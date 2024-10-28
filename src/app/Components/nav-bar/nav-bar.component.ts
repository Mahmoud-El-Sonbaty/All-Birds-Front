import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Icategory } from '../../../Modules/category';
import { CategeryServiceService } from '../../../Services/categery-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit,OnDestroy {

  sub:Subscription[]= []as Subscription[];
  category:Icategory[]=[]as Icategory[];

constructor(private categories:CategeryServiceService) {


}
  ngOnDestroy(): void {
    for (const element of this.sub) {
      element.unsubscribe();
  }
  }
  ngOnInit(): void {
    let item = this.categories.getAllCategory().subscribe(
      {
        next:(res)=>{
          this.category=res

        },
        error:(err)=>{
          console.log(err);


         }
      }
    )
    this.sub.push(item);
  }
  toggleBackButton(menu: string, show: boolean): void {
    const backButton = document.querySelector(`#${menu}Menu .back-button`) as HTMLElement;
    if (backButton) {
      backButton.classList.toggle('hidden', !show);
    }
  }

  showing(menu: string): void {
    const menuElement = document.getElementById(`${menu}Menu`) as HTMLElement;
    if (menuElement) {
      menuElement.classList.add('show');
     this. toggleBackButton(menu, true);

      document.querySelectorAll('.nav-link')
        .forEach(el => el.classList.add('hidden'));

      setTimeout(() => {
        menuElement.querySelectorAll('.fade-in').forEach((el, index) => {
          (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
          el.classList.add('show');
        });
      }, 400);
    }
  }

   goBack(menu: string): void {
    const menuElement = document.getElementById(`${menu}Menu`) as HTMLElement;
    if (menuElement) {
      menuElement.classList.remove('show');
      this.toggleBackButton(menu, false);

      document.querySelectorAll('.nav-link')
        .forEach(el => {
          el.classList.remove('hidden');
          el.classList.add('show');
        });
    }
  }



}
