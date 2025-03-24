import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visiteur } from '../models/visiteur';

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {

  // URL de l'API
  private apiURL: string = 'http://localhost:8082/api/visiteur';

  // Options HTTP par défaut
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des visiteurs
   * @returns Observable<Visiteur[]>
   */
  listeVisiteur(): Observable<Visiteur[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<Visiteur[]>(url, this.httpOptions);
  }

  /**
   * Récupère un visiteur par son ID
   * @param id Identifiant du visiteur
   * @returns Observable<Visiteur>
   */
  consulterVisiteur(id: number): Observable<Visiteur> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Visiteur>(url, this.httpOptions);
  }

  /**
   * Ajoute un nouveau visiteur
   * @param visiteur Objet Visiteur à ajouter
   * @returns Observable<Visiteur>
   */
  ajouterVisiteur(visiteur: Visiteur): Observable<Visiteur> {
    const url = `${this.apiURL}/save`;
    return this.http.post<Visiteur>(url, visiteur, this.httpOptions);
  }

  /**
   * Met à jour un visiteur existant
   * @param visiteur Objet Visiteur à mettre à jour
   * @returns Observable<Visiteur>
   */
  updateVisiteur(visiteur: Visiteur): Observable<Visiteur> {
    const url = `${this.apiURL}/update`;
    return this.http.put<Visiteur>(url, visiteur, this.httpOptions);
  }

  /**
   * Supprime un visiteur par son ID
   * @param id Identifiant du visiteur à supprimer
   * @returns Observable<void>
   */
  supprimerVisiteur(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
