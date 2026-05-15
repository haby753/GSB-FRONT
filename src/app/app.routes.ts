import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AddFicheFraisComponent } from './add-fiche-frais/add-fiche-frais.component';
import { ConsulterFicheFraisComponent } from './consulter-fiche-frais/consulter-fiche-frais.component';
import { EtatComponent } from './etat/etat.component';
import { FicheFraisComponent } from './fiche-frais/fiche-frais.component';
import { FraisForfaitComponent } from './frais-forfait/frais-forfait.component';
import { HeaderComponent } from './header/header.component';
import { LigneFraisForfaitComponent } from './ligne-frais-forfait/ligne-frais-forfait.component';
import { LigneFraisHorsForfaitComponent } from './ligne-frais-hors-forfait/ligne-frais-hors-forfait.component';
import { LoginComponent } from './login/login.component';
import { UpdateFicheFraisComponent } from './update-fiche-frais/update-fiche-frais.component';
import { VisiteurComponent } from './visiteur/visiteur.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'visiteur', component: VisiteurComponent },
  { path: 'fiche-frais', component: FicheFraisComponent },
  { path: 'etat', component: EtatComponent },
  { path: 'add-fiche-frais', component: AddFicheFraisComponent },
  { path: 'update-fiche-frais', component: UpdateFicheFraisComponent },
  { path: 'ligne-frais-hors-forfait', component: LigneFraisHorsForfaitComponent },
  { path: 'ligne-frais-forfait', component: LigneFraisForfaitComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'frais-forfait', component: FraisForfaitComponent },
  { path: 'consulter-fiche-frais', component: ConsulterFicheFraisComponent },
  { path: '**', redirectTo: '/login' }
];
