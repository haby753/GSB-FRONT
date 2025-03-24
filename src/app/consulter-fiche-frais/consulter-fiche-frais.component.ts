import { Component, OnInit } from '@angular/core';
import { FicheFrais } from '../models/fiche-frais';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheFraisService } from '../services/fiche-frais.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulter-fiche-frais',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './consulter-fiche-frais.component.html',
  styleUrl: './consulter-fiche-frais.component.css'
})
export class ConsulterFicheFraisComponent implements OnInit {
  ficheFrais: FicheFrais | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private ficheFraisService: FicheFraisService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.consulterFicheFrais(id);
  }

  consulterFicheFrais(id: number): void {
   // this.ficheFraisService.consulterFicheFrais(id).subscribe(
     // (data: FicheFrais) => {
      //  this.ficheFrais = data;
       // this.loading = false;  // Désactive le chargement lorsque les données sont reçues
     ////////////////// }
  }
}
