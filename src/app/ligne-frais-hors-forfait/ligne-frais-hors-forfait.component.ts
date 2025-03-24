import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LigneFraisHorsForfaitService } from '../services/ligne-frais-hors-forfait.service';
import { LigneFraisHorsForfait } from '../models/ligne-frais-hors-forfait';
import { FicheFrais } from '../models/fiche-frais';
import { Visiteur } from '../models/visiteur';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ligne-frais-hors-forfait',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './ligne-frais-hors-forfait.component.html',
  styleUrl: './ligne-frais-hors-forfait.component.css'
})
export class LigneFraisHorsForfaitComponent implements OnInit {
ficheFrais: any;

onSubmit() {
throw new Error('Method not implemented.');
}
  lignesFrais: LigneFraisHorsForfait[] = [];
  ligneForm: FormGroup;
  selectedLigne: LigneFraisHorsForfait | null = null;
isEditing: any;

  constructor(
    private ligneService: LigneFraisHorsForfaitService,
    private fb: FormBuilder
  ) {
    this.ligneForm = this.fb.group({
      id: [null],
      montant: ['', Validators.required],
      description: ['', Validators.required],
      ficheFrais: [null, Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLignesFrais();
  }

  loadLignesFrais(): void {
    this.ligneService.listeLignesFraisHorsForfait().subscribe(
      (data) => {
        this.lignesFrais = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des lignes de frais', error);
      }
    );
  }

  submitForm(): void {
    if (this.ligneForm.valid) {
      const ligne: LigneFraisHorsForfait = this.ligneForm.value;
      if (ligne.id) {
        this.ligneService.updateLigneFraisHorsForfait(ligne).subscribe(() => this.loadLignesFrais());
      } else {
        this.ligneService.ajouterLigneFraisHorsForfait(ligne).subscribe(() => this.loadLignesFrais());
      }
      this.ligneForm.reset();
    }
  }

  editLigne(ligne: LigneFraisHorsForfait): void {
    this.selectedLigne = ligne;
    this.ligneForm.patchValue(ligne);
  }

  deleteLigne(id: number): void {
    this.ligneService.supprimerLigneFraisHorsForfait(id).subscribe(() => this.loadLignesFrais());
  }
}
