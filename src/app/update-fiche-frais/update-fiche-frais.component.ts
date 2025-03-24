import { FicheFrais } from './../models/fiche-frais';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheFraisService } from '../services/fiche-frais.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

Router


@Component({
  selector: 'app-update-fiche-frais',
  standalone: true,
 imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './update-fiche-frais.component.html',
  styleUrls: ['./update-fiche-frais.component.css']
})
export class UpdateFicheFraisComponent implements OnInit {
  ficheForm: FormGroup;
  ficheId!: number;

  constructor(
    public router: Router,  // Changer ici de 'private' à 'public'
    private fb: FormBuilder,
    private ficheFraisService: FicheFraisService
  ) {
    this.ficheForm = this.fb.group({
      mois: ['', Validators.required],
      nbJustificatifs: [0, [Validators.required, Validators.min(0)]],
      montant: [0, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      visiteur: this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required]
      }),
      etat: this.fb.group({
        libelle: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.ficheId = +this.router.url.split('/').pop()!;
 //   this.loadFicheFrais();
  }

 // loadFicheFrais(): void {
   // this.ficheFraisService.consulterFicheFrais(this.ficheId).subscribe(fiche => {
      //this.ficheForm.patchValue(fiche);
   // });
 // }

 // updateFicheFrais(): void {
    //if (this.ficheForm.valid) {
    //  this.ficheFraisService.updateFicheFrais(this.ficheForm.value).subscribe(() => {
     //   this.router.navigate(['/fichesfrais']);
     // });
    }
  //}
//}
