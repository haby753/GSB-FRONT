import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FraisForfaitService } from '../services/frais-forfait.service';
import { FraisForfait } from '../models/frais-forfait';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-frais-forfait',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './frais-forfait.component.html',
  styleUrl: './frais-forfait.component.css'
})
export class FraisForfaitComponent implements OnInit {
  fraisForfaits: FraisForfait[] = [];
  fraisForm: FormGroup;
  selectedFrais?: FraisForfait;

  constructor(private service: FraisForfaitService, private fb: FormBuilder) {
    this.fraisForm = this.fb.group({
      libelle: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadFraisForfaits();
  }

  loadFraisForfaits(): void {
    this.service.listeFraisForfait().subscribe((data) => {
      this.fraisForfaits = data;
    });
  }

  submitForm(): void {
    if (this.fraisForm.valid) {
      const frais: FraisForfait = this.fraisForm.value;
      if (this.selectedFrais) {
        frais.id = this.selectedFrais.id;
        this.service.updateFraisForfait(frais).subscribe(() => {
          this.loadFraisForfaits();
          this.resetForm();
        });
      } else {
        this.service.ajouterFraisForfait(frais).subscribe(() => {
          this.loadFraisForfaits();
          this.resetForm();
        });
      }
    }
  }

  editFrais(frais: FraisForfait): void {
    this.selectedFrais = frais;
    this.fraisForm.patchValue(frais);
  }

  deleteFrais(id: number): void {
    if (!confirm('Confirmer la suppression de ce frais forfait ?')) return;

    this.service.supprimerFraisForfait(id).subscribe(() => {
      this.loadFraisForfaits();
    });
  }

  resetForm(): void {
    this.fraisForm.reset();
    this.selectedFrais = undefined;
  }
}
