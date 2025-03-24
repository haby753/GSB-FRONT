import { Component } from '@angular/core';
import { AppComponent } from "../app.component";
import { AccueilComponent } from '../accueil/accueil.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppComponent,AccueilComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor() { }

}
