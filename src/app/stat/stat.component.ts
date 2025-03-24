import { Component, OnInit } from '@angular/core';
import { FicheFraisService } from '../services/fiche-frais.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})


export class StatComponent implements OnInit{
  totalForfait: number = 0;
  totalHorsForfait: number = 0;
  totalGlobal: number = 0;

  constructor(private ficheFraisService: FicheFraisService) {}

  ngOnInit(): void {
    this.ficheFraisService.getTotauxFraisDepartement91().subscribe((data: { forfait: number; horsForfait: number; total: number; }) => {
      this.totalForfait = data.forfait;
      this.totalHorsForfait = data.horsForfait;
      this.totalGlobal = data.total;
    });
  }
}
