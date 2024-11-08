import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Icategory } from '../../../Modules/category';
import { CategeryServiceService } from '../../../Services/categery-service.service';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Route, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../Services/language.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterLink,SidebarComponent,TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit,OnDestroy ,OnChanges {

  sub:Subscription[]= []as Subscription[];
  category:Icategory[]=[]as Icategory[];
  routing:any;
  language:string;
constructor(private categories:CategeryServiceService,private lang:LanguageService ,private route :Router) {
  this.language=lang.getLanguage();
}
  ngOnChanges(changes: SimpleChanges): void {

    let language=this.lang.currentLang$.subscribe();



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
          this.category=res.data

        },
        error:(err)=>{
          console.log(err);


         }
      }
    )
    this.sub.push(item);

    let item2=this.lang.currentLang$.subscribe();

    this.sub.push(item2);


  }
  toggleBackButton(menu: number, show: boolean): void {
    const backButton = document.querySelector(`#Menu${menu}`) as HTMLElement;



    if (backButton) {
      backButton.classList.toggle('hidden', !show);


    }
  }

  showing(menu: number, Level: number): void {
    // console.log(`Showing menu id: ${menu}, Level: ${Level}`);

    const menuElement = document.getElementById(`Menu${menu}`) as HTMLElement;
    if (menuElement) {
        menuElement.classList.add('show');
        menuElement.classList.remove('hidden');
        this.toggleBackButton(menu, true);

      if(Level>0){

        // document.querySelectorAll('.level'+Level+'.nav-link')[4].parentElement?.parentElement?.children[0].classList.add('hidden');
        document.querySelectorAll('.level'+Level+'.nav-item')
        .forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.level'+Level+'.nav-item')
            .forEach(el => el.textContent?.includes("→")?el.parentElement?.parentElement?.children[0].classList.add('hidden'):"");
      }else{

        document.querySelectorAll('.level'+Level+'.nav-link')
            .forEach(el => el.classList.add('hidden'));
      }

          console.log(document.querySelectorAll('.level'+Level+'.nav-link'))

        setTimeout(() => {
            menuElement.querySelectorAll('.fade-in').forEach((el, index) => {
                (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
                el.classList.add('show');
                el.classList.remove('hidden');
            });
        }, 400);
    }
}


   goBack(menu: number,Level:number): void {
    // console.log(`Going back to menu id: ${menu}, Level: ${Level}`);

    const menuElement = document.getElementById(`Menu${menu}`) as HTMLElement;
    if (menuElement) {
      this.toggleBackButton(menu, false);

        // console.log( document.querySelectorAll('.nav-link.level'+Level)  )
        // console.log( menu , Level  )
        if(Level>0){

          document.querySelectorAll('.nav-item.level'+Level)
          .forEach(el => {
            el.classList.remove('hidden');
            el.classList.add('show');
          });

          document.querySelectorAll('.level'+Level+'.nav-item')
          .forEach(el => el.textContent?.includes("→")?el.parentElement?.parentElement?.children[0].classList.remove('hidden'):"");
               }else{
                document.querySelectorAll('.nav-link.level'+Level)
                .forEach(el => {
                  el.classList.remove('hidden');
                  el.classList.add('show');
                });
               }

    }
  }


  toggleLanguage() {
    const currentUrl = this.route.url;

    // Toggle the language
    this.lang.toggleLanguage();

    this.route.navigateByUrl(currentUrl);
    window.location.reload();
  }
}
