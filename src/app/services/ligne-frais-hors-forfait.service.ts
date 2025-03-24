import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneFraisHorsForfait } from '../models/ligne-frais-hors-forfait'; // Import du modèle LigneFraisHorsForfait

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LigneFraisHorsForfaitService {
  getLignes() {
    throw new Error('Method not implemented.');
  }
  addLigne(newLigne: LigneFraisHorsForfait) {
    throw new Error('Method not implemented.');
  }
  deleteLigne(id: number) {
    throw new Error('Method not implemented.');
  }

  private apiURL: string = 'http://localhost:8082/api/lignefraishorsforfait'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer la liste des lignes de frais hors forfait
  listeLignesFraisHorsForfait(): Observable<LigneFraisHorsForfait[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<LigneFraisHorsForfait[]>(url);
  }

  // Consulter une ligne de frais hors forfait spécifique par ID
  consulterLigneFraisHorsForfait(id: number): Observable<LigneFraisHorsForfait> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<LigneFraisHorsForfait>(url);
  }

  // Ajouter une ligne de frais hors forfait
  ajouterLigneFraisHorsForfait(ligneFraisHorsForfait: LigneFraisHorsForfait): Observable<LigneFraisHorsForfait> {
    const url = `${this.apiURL}/save`;
    return this.http.post<LigneFraisHorsForfait>(url, ligneFraisHorsForfait, httpOptions);
  }

  // Supprimer une ligne de frais hors forfait par ID
  supprimerLigneFraisHorsForfait(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Mettre à jour une ligne de frais hors forfait
  updateLigneFraisHorsForfait(ligneFraisHorsForfait: LigneFraisHorsForfait): Observable<LigneFraisHorsForfait> {
    const url = `${this.apiURL}/update`;
    return this.http.put<LigneFraisHorsForfait>(url, ligneFraisHorsForfait, httpOptions);
  }
}
