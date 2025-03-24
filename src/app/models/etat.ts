import { FicheFrais } from './fiche-frais';

export interface Etat {
  id: number; // Identifiant unique de l'état
  libelle: string; // Libellé de l'état, par exemple : "Validée", "En attente", etc.
  fichesFrais?: FicheFrais[]; // Liste des fiches de frais associées (optionnel)
}
