import { Visiteur } from "./visiteur";
import { Etat } from "./etat";

// Mise à jour de l'interface FicheFrais pour correspondre à la structure JSON attendue
export interface FicheFrais {
  id?: number;
  mois: string;
  nbJustificatifs: number;
  montantvalide: number;  // Ajusté pour correspondre à la nomenclature de l'API
  date: string;           // La date telle qu'elle est dans le backend
  visiteur_id: Visiteur;  // Changé de `visiteur` à `visiteur_id` pour correspondre à l'API
  etat_id: Etat;          // Changé de `etat` à `etat_id` pour correspondre à l'API
  ligneFraisHorsForfaits?: any[];
  ligneFraisForfaits?: any[];
}

