import { FicheFrais } from './fiche-frais';






export interface Visiteur {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  ville: string;
  cp: string;
  dateEmbauche: string; // Format ISO
  login: string;
  mdp: string;
  fichesFrais?: FicheFrais[];
}

