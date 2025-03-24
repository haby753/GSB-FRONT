import { LigneFraisForfait } from './ligne-frais-forfait';

export interface FraisForfait {
  id: number; // Identifiant unique du frais forfaitaire
  libelle: string; // Libellé décrivant le type de frais forfaitaire
  montant: number; // Montant associé à ce frais forfaitaire
  ligneFraisForfaits: LigneFraisForfait[]; // Liste des lignes de frais forfaitaires associées
}
