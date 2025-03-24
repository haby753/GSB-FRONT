import { Component, OnInit } from '@angular/core';
import { LigneFraisHorsForfaitService } from '../services/ligne-frais-hors-forfait.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LigneFraisHorsForfait } from '../models/ligne-frais-hors-forfait';

@Component({
  selector: 'app-add-ligne-frais-hors-forfait',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-ligne-frais-hors-forfait.component.html',
  styleUrl: './add-ligne-frais-hors-forfait.component.css'
})
export class AddLigneFraisHorsForfaitComponent implements OnInit {
  ligneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ligneService: LigneFraisHorsForfaitService
  ) {
    this.ligneForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Ajouter une nouvelle ligne de frais hors forfait
  ajouterLigne(): void {
    if (this.ligneForm.valid) {
      const nouvelleLigne: LigneFraisHorsForfait = {
        ...this.ligneForm.value,
        id: 0, // L'ID sera généré côté serveur
        ficheFrais: { id: 1 } as any, // À adapter avec une vraie fiche frais
        idvisiteur: { id: 1 } as any // À adapter avec un vrai visiteur
      };

      this.ligneService.ajouterLigneFraisHorsForfait(nouvelleLigne).subscribe({
        next: () => {
          // Action après ajout (par exemple réinitialisation du formulaire ou affichage d'un message)
          this.ligneForm.reset();
          alert('Ligne de frais ajoutée avec succès');
        },
        error: (err) => console.error('Erreur lors de l\'ajout:', err)
      });
    }
  }
}
