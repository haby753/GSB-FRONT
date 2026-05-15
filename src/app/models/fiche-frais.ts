import { Visiteur } from './visiteur';
import { Etat } from './etat';

export interface FicheFrais {
  id?: number;
  mois: string;
  nbJustificatifs: number;
  montantvalide: number;
  montantValide?: number;
  date: string;
  dateModif?: string | null;
  visiteur_id: Visiteur;
  etat_id: Etat;
  ligneFraisHorsForfaits?: any[];
  ligneFraisForfaits?: any[];
}
