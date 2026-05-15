import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FraisForfait } from '../models/frais-forfait'; // Import du modèle FraisForfait

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FraisForfaitService {

  private apiURL: string = '/api/fraisforfait'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer la liste des frais forfaitisés
  listeFraisForfait(): Observable<FraisForfait[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<FraisForfait[]>(url);
  }

  // Consulter un frais forfaitisé spécifique par ID
  consulterFraisForfait(id: number): Observable<FraisForfait> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<FraisForfait>(url);
  }

  // Ajouter un frais forfaitisé
  ajouterFraisForfait(fraisForfait: FraisForfait): Observable<FraisForfait> {
    const url = `${this.apiURL}/save`;
    return this.http.post<FraisForfait>(url, fraisForfait, httpOptions);
  }

  // Supprimer un frais forfaitisé par ID
  supprimerFraisForfait(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Mettre à jour un frais forfaitisé
  updateFraisForfait(fraisForfait: FraisForfait): Observable<FraisForfait> {
    const url = `${this.apiURL}/update`;
    return this.http.put<FraisForfait>(url, fraisForfait, httpOptions);
  }
}
