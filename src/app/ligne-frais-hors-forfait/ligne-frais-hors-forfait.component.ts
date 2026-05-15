import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LigneFraisHorsForfaitService } from '../services/ligne-frais-hors-forfait.service';
import { LigneFraisHorsForfait } from '../models/ligne-frais-hors-forfait';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ligne-frais-hors-forfait',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ligne-frais-hors-forfait.component.html',
  styleUrl: './ligne-frais-hors-forfait.component.css'
})
export class LigneFraisHorsForfaitComponent implements OnInit {
  lignes: LigneFraisHorsForfait[] = [];
  ligneForm: FormGroup;
  selectedLigne?: LigneFraisHorsForfait;

  constructor(private service: LigneFraisHorsForfaitService, private fb: FormBuilder) {
    this.ligneForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      ficheFraisId: ['', Validators.required],
      visiteurId: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLignes();
  }

  loadLignes(): void {
    this.service.listeLignesFraisHorsForfait().subscribe((data) => {
      this.lignes = data;
    });
  }

  submitForm(): void {
    if (this.ligneForm.valid) {
      const ligne: LigneFraisHorsForfait = this.ligneForm.value;
      if (this.selectedLigne) {
        ligne.id = this.selectedLigne.id;
        this.service.updateLigneFraisHorsForfait(ligne).subscribe(() => {
          this.loadLignes();
          this.resetForm();
        });
      } else {
        this.service.ajouterLigneFraisHorsForfait(ligne).subscribe(() => {
          this.loadLignes();
          this.resetForm();
        });
      }
    }
  }

  editLigne(ligne: LigneFraisHorsForfait): void {
    this.selectedLigne = ligne;
    this.ligneForm.patchValue(ligne);
  }

  deleteLigne(id: number): void {
    if (!confirm('Confirmer la suppression de cette ligne hors forfait ?')) return;

    this.service.supprimerLigneFraisHorsForfait(id).subscribe(() => {
      this.loadLignes();
    });
  }

  resetForm(): void {
    this.ligneForm.reset();
    this.selectedLigne = undefined;
  }
}
