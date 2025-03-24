import { Visiteur } from './../models/visiteur';
import { Component, OnInit } from '@angular/core';
import { VisiteurService } from '../services/visiteur.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-visiteur',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css'],
})
export class VisiteurComponent implements OnInit {

  visiteurs? : Visiteur[];
  constructor
  (private visiteurService : VisiteurService) {
    }
    ngOnInit(): void {
      this.chargerVisiteurs();

      }
   chargerVisiteurs(){

      this.visiteurService.listeVisiteur().subscribe(prods => {
      console.log(prods);
      this.visiteurs = prods;
          });
      }
      supprimerVisiteur(p: Visiteur)
      {
            let conf = confirm("Etes-vous sûr ?");
            if (conf)
                this.visiteurService.supprimerVisiteur(p.id).subscribe(() => {

                console.log("Visiteur supprimé");

                this.chargerVisiteurs();
                });
                }
    }





