import { FicheFrais } from './fiche-frais';
import { Visiteur } from './visiteur';

export interface LigneFraisHorsForfait {

  id: number; // Identifiant unique de la ligne de frais hors forfait
  montant: number; // Montant de ce frais hors forfait
  description: string; // Description du frais hors forfait
  ficheFrais: number; // La fiche de frais à laquelle cette ligne est associée
  date: string; // Date du frais hors forfait (au format ISO string)
  idvisiteur: number; // Le visiteur associé à cette ligne de frais hors forfait
}
