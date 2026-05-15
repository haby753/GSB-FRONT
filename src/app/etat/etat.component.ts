import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EtatService } from '../services/etat.service';
import { Etat } from '../models/etat';

@Component({
  selector: 'app-etat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {
  etats: Etat[] = [];
  selectedEtat: Etat | null = null;
  newEtat: Etat = { id: 0, libelle: '' };
  chargement = false;
  erreurChargement = '';
  messageSucces = '';

  constructor(private etatService: EtatService) {}

  ngOnInit(): void {
    this.loadEtats();
  }

  loadEtats(): void {
    this.chargement = true;
    this.erreurChargement = '';
    this.messageSucces = '';

    this.etatService.getEtats().subscribe({
      next: etats => {
        this.etats = Array.isArray(etats) ? etats : [];
        this.chargement = false;
      },
      error: error => {
        console.error('Erreur lors du chargement des etats', error);
        this.etats = [];
        this.chargement = false;
        this.erreurChargement = "Impossible de charger les etats. Verifie que l'API /api/etat/all fonctionne.";
      }
    });
  }

  consulterEtat(id: number): void {
    this.messageSucces = '';
    this.erreurChargement = '';

    this.etatService.consulterEtat(id).subscribe({
      next: etat => this.selectedEtat = { ...etat },
      error: error => {
        console.error("Erreur lors de la consultation de l'etat", error);
        this.erreurChargement = "Impossible de consulter cet etat.";
      }
    });
  }

  ajouterEtat(): void {
    const libelle = this.newEtat.libelle.trim();
    if (!libelle) {
      this.erreurChargement = 'Le libelle est obligatoire.';
      return;
    }

    this.erreurChargement = '';
    this.messageSucces = '';

    this.etatService.ajouterEtat({ ...this.newEtat, libelle }).subscribe({
      next: etat => {
        this.etats = [...this.etats, etat];
        this.newEtat = { id: 0, libelle: '' };
        this.messageSucces = 'Etat ajoute avec succes.';
      },
      error: error => {
        console.error("Erreur lors de l'ajout de l'etat", error);
        this.erreurChargement = "Impossible d'ajouter cet etat.";
      }
    });
  }

  updateEtat(): void {
    if (!this.selectedEtat) return;

    const libelle = this.selectedEtat.libelle.trim();
    if (!libelle) {
      this.erreurChargement = 'Le libelle est obligatoire.';
      return;
    }

    this.erreurChargement = '';
    this.messageSucces = '';

    this.etatService.updateEtat({ ...this.selectedEtat, libelle }).subscribe({
      next: etat => {
        const index = this.etats.findIndex(e => e.id === etat.id);
        if (index !== -1) {
          this.etats[index] = etat;
          this.etats = [...this.etats];
        }
        this.selectedEtat = null;
        this.messageSucces = 'Etat mis a jour avec succes.';
      },
      error: error => {
        console.error("Erreur lors de la mise a jour de l'etat", error);
        this.erreurChargement = "Impossible de mettre a jour cet etat.";
      }
    });
  }

  supprimerEtat(id: number): void {
    const confirmation = confirm('Confirmer la suppression de cet etat ?');
    if (!confirmation) return;

    this.erreurChargement = '';
    this.messageSucces = '';

    this.etatService.supprimerEtat(id).subscribe({
      next: () => {
        this.etats = this.etats.filter(e => e.id !== id);
        if (this.selectedEtat?.id === id) {
          this.selectedEtat = null;
        }
        this.messageSucces = 'Etat supprime avec succes.';
      },
      error: error => {
        console.error("Erreur lors de la suppression de l'etat", error);
        this.erreurChargement = "Impossible de supprimer cet etat.";
      }
    });
  }

  annulerEdition(): void {
    this.selectedEtat = null;
  }
}
