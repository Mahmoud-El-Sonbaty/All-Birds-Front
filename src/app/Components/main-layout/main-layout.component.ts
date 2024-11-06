import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavBarComponent,RouterOutlet,FooterComponent,SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
