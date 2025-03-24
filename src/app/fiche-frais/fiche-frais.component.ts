import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FicheFrais } from '../models/fiche-frais';
import { Visiteur } from '../models/visiteur';
import { Etat } from '../models/etat';

import { FicheFraisService } from '../services/fiche-frais.service';
import { VisiteurService } from '../services/visiteur.service';
import { EtatService } from '../services/etat.service';

@Component({
  selector: 'app-fiche-frais',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './fiche-frais.component.html',
  styleUrls: ['./fiche-frais.component.css']
})
export class FicheFraisComponent implements OnInit {

  visiteur: Visiteur | null = null;
  etats: Etat[] = [];
  fichesFrais: FicheFrais[] = [];

  fiche: FicheFrais = {


    mois: '2025-02',
    nbJustificatifs: 5,
    montantvalide: 320.50,
    date: '2025-03-01',
    // Make sure to add a description field

    visiteur_id: {
      id: 3,
      nom: 'Marie',
      prenom: 'Joie',
      adresse: '40 rue de Villpinte',
      ville: 'Villpinte',
      cp: '95000',
      dateEmbauche: '2024-01-15',
      login: 'mariejoie',
      mdp: 'm123456789',
      fichesFrais: []  // Make sure to add this if required by the Visiteur interface
    },
    etat_id: {
      id: 2,
      libelle: 'FicheFrais associée à un Etat'
    },

  };


  ajouterFicheForm = false;
  consulterFicheForm = false;
  updateFicheForm = false;

  selectedFiche: FicheFrais | null = null;

  constructor(
    private ficheFraisService: FicheFraisService,
    private visiteurService: VisiteurService,
    private etatService: EtatService
  ) {}

  ngOnInit(): void {

    this.chargerFichesFrais();

    this.etatService.getEtats().subscribe(etats => {
      this.etats = etats;
    });
  }


  // Méthode pour récupérer les fiches de frais
  chargerFichesFrais(): void {
    this.ficheFraisService.listeFicheFrais().subscribe(data => {
      this.fichesFrais = data;  // Assigner les données à la liste des fiches
      console.log("Liste des fiches frais chargée:", data);
    });
  }


  /** Afficher le formulaire d'ajout */
  afficherAjout(): void {
    this.ajouterFicheForm = true;
    this.consulterFicheForm = false;
    this.updateFicheForm = false;
    this.selectedFiche = null;
  }

  /** Ajouter une fiche de frais */
  ajouterFiche(): void {


    this.ficheFraisService.ajouterFicheFrais(this.fiche).subscribe({
      next: response => {
        console.log('Fiche ajoutée avec succès', response);
        this.ajouterFicheForm = false;
       // this.chargerFiches();
      },
      error: err => {
        console.error('Erreur lors de l\'ajout de la fiche', err);
      }
    });
  }

  /** Consulter une fiche */
  consulterFiche(fiche: FicheFrais): void {
    this.selectedFiche = fiche;
    this.consulterFicheForm = true;
    this.ajouterFicheForm = false;
    this.updateFicheForm = false;
  }

  /** Modifier une fiche */
  modifierFiche(fiche: FicheFrais): void {
    this.selectedFiche = { ...fiche };
    this.updateFicheForm = true;
    this.ajouterFicheForm = false;
    this.consulterFicheForm = false;
  }

  /** Mettre à jour une fiche */
  updateFiche(): void {
    if (!this.selectedFiche || !this.visiteur) return;

    const ficheMaj: FicheFrais = {
      ...this.selectedFiche,
      visiteur_id: this.visiteur,
      etat_id: this.selectedFiche.etat_id,
      ligneFraisForfaits: this.selectedFiche.ligneFraisForfaits || [],
      ligneFraisHorsForfaits: this.selectedFiche.ligneFraisHorsForfaits || []
    };

    this.ficheFraisService.updateFicheFrais(ficheMaj).subscribe(() => {
      this.updateFicheForm = false;
      //this.chargerFiches();
    });
  }

  /** Supprimer une fiche */
  supprimerFiche(id: number): void {
    if (!confirm('Confirmer la suppression de cette fiche ?')) return;

    this.ficheFraisService.supprimerFicheFrais(id).subscribe(() => {
     // this.chargerFiches();
    });
  }
}
