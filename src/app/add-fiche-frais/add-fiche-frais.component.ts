import { Visiteur } from './../models/visiteur';
import { Etat } from '../models/etat';
import { Component, NgModule, OnInit } from '@angular/core';
import {  FicheFrais } from '../models/fiche-frais';
import { FicheFraisService } from '../services/fiche-frais.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NgModel, FormsModule } from '@angular/forms';
VisiteurComponent
import { VisiteurService } from '../services/visiteur.service';
import { VisiteurComponent } from '../visiteur/visiteur.component';
NgModel


@Component({
  selector: 'app-add-fiche-frais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './add-fiche-frais.component.html',
  styleUrls: ['./add-fiche-frais.component.css']
})
export class AddFicheFraisComponent implements OnInit {

  fichesFrais: FicheFrais[] = [];
  visiteurs: Visiteur[] = [];
  etats: Etat[] = [];

   newFiche: FicheFrais = {


    id: 101,
    mois: '2025-02',
    nbJustificatifs: 5,
    montantvalide: 320.50,
    date: '2025-03-01',

    visiteur_id: {
      id: 3,
      nom: 'Marie',
      prenom: 'joie',
      adresse: '40 rue de villpinte',
      ville: 'villpinte',
      cp: '95000',
      dateEmbauche: '2024-01-15',
      login: 'mariejoie',
      mdp: 'm123456789'
    },

    etat_id: {
      id: 2,
      libelle: 'FicheFrais associée à un Etat'
    },


  };

  constructor(
    private ficheFraisService: FicheFraisService,
    private VisiteurService: VisiteurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerFichesFrais();
  }

  chargerFichesFrais(): void {
    this.ficheFraisService.listeFicheFrais().subscribe(data => {
      this.fichesFrais = data;
      console.log("Liste des fiches frais chargée:", data);
    });
  }

  chargerVisiteur(): void {
    this.VisiteurService.listeVisiteur().subscribe(data => {
      this.visiteurs = data;
      console.log("Liste des visiteurs chargée:", data);
    });
  }


  addFiche(): void {
    this.ficheFraisService.ajouterFicheFrais(this.newFiche).subscribe(data => {
      console.log("Fiche ajoutée avec succès:", data);
      this.router.navigate(['fiches-frais']); // redirection après ajout
    });
  }

}
