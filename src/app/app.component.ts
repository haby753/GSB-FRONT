
import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AccueilComponent } from "./accueil/accueil.component";
import { HeaderComponent } from "./header/header.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { VisiteurComponent } from "./visiteur/visiteur.component";
import { FicheFraisComponent } from "./fiche-frais/fiche-frais.component";
import { LigneFraisHorsForfaitComponent } from './ligne-frais-hors-forfait/ligne-frais-hors-forfait.component';
import { LigneFraisForfaitComponent } from './ligne-frais-forfait/ligne-frais-forfait.component';
import { HttpClient } from '@angular/common/http';
import { ConsulterFicheFraisComponent } from './consulter-fiche-frais/consulter-fiche-frais.component';
import { CommonModule } from '@angular/common';
import { EtatComponent } from './etat/etat.component';
import { StatComponent } from './stat/stat.component'
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddFicheFraisComponent } from './add-fiche-frais/add-fiche-frais.component';
import { AddLigneFraisHorsForfaitComponent } from './add-ligne-frais-hors-forfait/add-ligne-frais-hors-forfait.component';
NgModule
RouterModule
HttpClient
FormGroup






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, AccueilComponent, HeaderComponent, ConnexionComponent, RouterModule, FicheFraisComponent,EtatComponent, VisiteurComponent, LigneFraisHorsForfaitComponent, LigneFraisForfaitComponent, ConsulterFicheFraisComponent ,CommonModule
   , ReactiveFormsModule,AddFicheFraisComponent,AddLigneFraisHorsForfaitComponent,StatComponent ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'GestionDesFrais';
}
