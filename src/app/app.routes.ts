import { AddLigneFraisHorsForfaitComponent } from './add-ligne-frais-hors-forfait/add-ligne-frais-hors-forfait.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FicheFraisComponent } from './fiche-frais/fiche-frais.component';
import { LigneFraisHorsForfaitComponent } from './ligne-frais-hors-forfait/ligne-frais-hors-forfait.component';
import { VisiteurComponent } from './visiteur/visiteur.component';
import { LigneFraisForfaitComponent } from './ligne-frais-forfait/ligne-frais-forfait.component';
import { AddFicheFraisComponent } from './add-fiche-frais/add-fiche-frais.component';
import { HeaderComponent } from './header/header.component';
import { FraisForfaitComponent } from './frais-forfait/frais-forfait.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, NgModel, NgModelGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsulterFicheFraisComponent } from './consulter-fiche-frais/consulter-fiche-frais.component';
import { AppComponent } from './app.component';
import { UpdateFicheFraisComponent } from './update-fiche-frais/update-fiche-frais.component';
import { EtatComponent } from './etat/etat.component';
import { StatComponent } from './stat/stat.component'
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [

  //{ path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '', component:StatComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'visiteur', component: VisiteurComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'fiche-frais', component: FicheFraisComponent },
  { path: 'etat', component: EtatComponent },
  { path: 'add-fiche-frais', component: AddFicheFraisComponent },
  { path: 'update-fiche-frais', component: UpdateFicheFraisComponent },
  { path: 'ligne-frais-hors-forfait', component: LigneFraisHorsForfaitComponent },
  { path: 'ligne-frais-forfait', component: LigneFraisForfaitComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'frais-forfait', component: FraisForfaitComponent },
  { path: 'consulter-fiche-frais', component: ConsulterFicheFraisComponent },
  { path: 'add-ligne-frais-hors-forfait', component: AddLigneFraisHorsForfaitComponent },
  { path: 'appComponent', component: AppComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule,CommonModule,FormsModule,NgModule,NgModel,FormGroup,ReactiveFormsModule,NgModelGroup,RouterModule,FormGroup,HttpClientModule, ],



  exports: [RouterModule]
})
export class AppRoutingModule { }
