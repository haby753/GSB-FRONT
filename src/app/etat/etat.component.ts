import { Component, NgModule, OnInit } from '@angular/core';
import { EtatService } from '../services/etat.service'; // Importation du service EtatService
import { Etat } from '../models/etat'; // Importation du modèle Etat
import { CommonModule } from '@angular/common';
import {  NgModel, NgModelGroup, ReactiveFormsModule } from '@angular/forms';
NgModel
 NgModelGroup



@Component({
  selector: 'app-etat',
   standalone:true,
    imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {

  etats: Etat[] = []; // Liste des états
  selectedEtat: Etat | null = null; // État sélectionné pour la consultation ou la mise à jour
  newEtat: Etat = { id: 0, libelle: '' }; // Nouvel état à ajouter

  constructor(private etatService: EtatService) { }

  ngOnInit(): void {
    this.loadEtats(); // Charger la liste des états au démarrage
  }

  // Charger la liste des états
  loadEtats(): void {
    this.etatService.getEtats().subscribe(
      data => this.etats = data,
      error => console.error('Erreur lors du chargement des états', error)
    );
  }

  // Consulter un état par son ID
  consulterEtat(id: number): void {
    this.etatService.consulterEtat(id).subscribe(
      data => this.selectedEtat = data,
      error => console.error('Erreur lors de la consultation de l\'état', error)
    );
  }

  // Ajouter un nouvel état
  ajouterEtat(): void {
    this.etatService.ajouterEtat(this.newEtat).subscribe(
      data => {
        this.etats.push(data); // Ajouter le nouvel état à la liste
        this.newEtat = { id: 0, libelle: '' }; // Réinitialiser le formulaire
      },
      error => console.error('Erreur lors de l\'ajout de l\'état', error)
    );
  }

  // Mettre à jour un état
  updateEtat(): void {
    if (this.selectedEtat) {
      this.etatService.updateEtat(this.selectedEtat).subscribe(
        data => {
          const index = this.etats.findIndex(e => e.id === data.id);
          if (index !== -1) {
            this.etats[index] = data; // Mettre à jour l'état dans la liste
          }
          this.selectedEtat = null; // Réinitialiser l'état sélectionné
        },
        error => console.error('Erreur lors de la mise à jour de l\'état', error)
      );
    }
  }

  // Supprimer un état par son ID
  supprimerEtat(id: number): void {
    this.etatService.supprimerEtat(id).subscribe(
      () => {
        this.etats = this.etats.filter(e => e.id !== id); // Supprimer l'état de la liste
      },
      error => console.error('Erreur lors de la suppression de l\'état', error)
    );
  }
}
