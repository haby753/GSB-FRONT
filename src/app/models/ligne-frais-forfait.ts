import { FicheFrais } from './fiche-frais';
import { FraisForfait } from './frais-forfait';

export interface LigneFraisForfait {
  id: number; // Identifiant unique de la ligne de frais forfaitaire
  quantite: number; // Quantité de ce frais forfaitaire
  ficheFrais: FicheFrais; // La fiche de frais à laquelle cette ligne est associée
  fraisForfait: FraisForfait; // Le frais forfaitaire auquel cette ligne est associée
}
