import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etat } from '../models/etat'; // Importation du modèle Etat

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EtatService {


  private apiURL: string = '/api/etat'; // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer la liste des états
  getEtats(): Observable<Etat[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<Etat[]>(url);
  }

  // Consulter un état spécifique par son ID
  consulterEtat(id: number): Observable<Etat> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Etat>(url);
  }


  // Ajouter un nouvel état
  ajouterEtat(etat: Etat): Observable<Etat> {
    const url = `${this.apiURL}/save`;
    return this.http.post<Etat>(url, etat, httpOptions);
  }

  // Supprimer un état par son ID
  supprimerEtat(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Mettre à jour un état
  updateEtat(etat: Etat): Observable<Etat> {
    const url = `${this.apiURL}/update`;
    return this.http.put<Etat>(url, etat, httpOptions);
  }
}
