import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneFraisForfait } from '../models/ligne-frais-forfait'; // Import du modèle LigneFraisForfait

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LigneFraisForfaitService {

  private apiURL: string = '/GsbGestionDesFrais/api/lignefraisforfait'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer la liste des lignes de frais forfaitisés
  listeLignesFraisForfait(): Observable<LigneFraisForfait[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<LigneFraisForfait[]>(url);
  }

  // Consulter une ligne de frais forfaitisé spécifique par ID
  consulterLigneFraisForfait(id: number): Observable<LigneFraisForfait> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<LigneFraisForfait>(url);
  }

  // Ajouter une ligne de frais forfaitisé
  ajouterLigneFraisForfait(ligneFraisForfait: LigneFraisForfait): Observable<LigneFraisForfait> {
    const url = `${this.apiURL}/save`;
    return this.http.post<LigneFraisForfait>(url, ligneFraisForfait, httpOptions);
  }

  // Supprimer une ligne de frais forfaitisé par ID
  supprimerLigneFraisForfait(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Mettre à jour une ligne de frais forfaitisé
  updateLigneFraisForfait(ligneFraisForfait: LigneFraisForfait): Observable<LigneFraisForfait> {
    const url = `${this.apiURL}/update`;
    return this.http.put<LigneFraisForfait>(url, ligneFraisForfait, httpOptions);
  }
}
