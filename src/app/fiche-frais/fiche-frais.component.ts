import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FicheFrais } from '../models/fiche-frais';
import { Visiteur } from '../models/visiteur';
import { Etat } from '../models/etat';
import jsPDF from 'jspdf';
import { FicheFraisService } from '../services/fiche-frais.service';
import { VisiteurService } from '../services/visiteur.service';
import { EtatService } from '../services/etat.service';

@Component({
  selector: 'app-fiche-frais',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,ReactiveFormsModule],
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

  ajouterFiche(): void {

    const moisSaisi = new Date(this.fiche.mois + '-01');
    const aujourdHui = new Date();

    if (moisSaisi > aujourdHui) {
      alert('Le mois sélectionné ne peut pas être dans le futur.');
      return;
    }

    if (this.fiche.nbJustificatifs < 1) {
      alert('Le nombre de justificatifs doit être supérieur ou égal à 1.');
      return;
    }

    this.ficheFraisService.ajouterFicheFrais(this.fiche).subscribe({
      next: response => {
        console.log('Fiche ajoutée avec succès', response);
        this.ajouterFicheForm = false;
        this.chargerFichesFrais();
      },
      error: err => {
        console.error('Erreur lors de l\'ajout de la fiche', err);
      }
    });
  }

  // Ajoute les deux méthodes visuelles pour le template :

  moisInvalide(): boolean {
    if (!this.fiche.mois) return false;
    const moisSaisi = new Date(this.fiche.mois + '-01');
    const aujourdHui = new Date();
    return moisSaisi > aujourdHui;
  }

  justificatifInvalide(): boolean {
    return this.fiche.nbJustificatifs < 1;
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
    this.fiche = { ...fiche };
    this.updateFicheForm = true;
    this.ajouterFicheForm = false;
    this.consulterFicheForm = false;
  }

  /** Mettre à jour une fiche */
  updateFiche(): void {
    if (!this.selectedFiche) return;

    const ficheMaj: FicheFrais = {
      ...this.selectedFiche,
      ...this.fiche,
      visiteur_id: this.fiche.visiteur_id || this.selectedFiche.visiteur_id,
      etat_id: this.fiche.etat_id || this.selectedFiche.etat_id,
      ligneFraisForfaits: this.selectedFiche.ligneFraisForfaits || [],
      ligneFraisHorsForfaits: this.selectedFiche.ligneFraisHorsForfaits || []
    };

    this.ficheFraisService.updateFicheFrais(ficheMaj).subscribe(() => {
      this.updateFicheForm = false;
      this.chargerFichesFrais();
    });
  }

  /** Supprimer une fiche */
  supprimerFiche(id: number): void {
    if (!confirm('Confirmer la suppression de cette fiche ?')) return;

    this.ficheFraisService.supprimerFicheFrais(id).subscribe(() => {
      this.chargerFichesFrais();
    });
  }
 /** 🎯 Nouvelle fonctionnalité : Télécharger la fiche en PDF */
 telechargerPDF(): void {
  if (!this.selectedFiche) {
    alert("Aucune fiche sélectionnée !");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Fiche de Frais", 20, 20);
  doc.setFontSize(12);

  doc.text(`Mois : ${this.selectedFiche.mois}`, 20, 40);
  doc.text(`Date : ${this.selectedFiche.date}`, 20, 50);
  doc.text(`Montant validé : ${this.selectedFiche.montantvalide} €`, 20, 60);
  doc.text(`Nombre de justificatifs : ${this.selectedFiche.nbJustificatifs}`, 20, 70);
  doc.text(`État : ${this.selectedFiche.etat_id.libelle}`, 20, 80);
  doc.text(`Visiteur : ${this.selectedFiche.visiteur_id.prenom} ${this.selectedFiche.visiteur_id.nom}`, 20, 90);

  doc.save(`FicheFrais_${this.selectedFiche.mois}.pdf`);
}
}
