import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
Router



@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  constructor(private router: Router) { }


  goToConnexion(): void {
    this.router.navigate(['/connexion']);
  }

}
