import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FicheFrais } from '../models/fiche-frais';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class FicheFraisService {
  getTotauxFraisDepartement91(): Observable<{ forfait: number; horsForfait: number; total: number }> {
    return this.http.get<{ forfait: number; horsForfait: number; total: number }>(`${this.apiURL}/totaux/91`);
  }
  apiURL: string = 'http://localhost:8082/api/fichefrais';

  constructor(private http: HttpClient) {}

  // Obtenir la liste des fiches de frais
  listeFicheFrais(): Observable<FicheFrais[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<FicheFrais[]>(url);
  }

  // Consulter une fiche de frais spécifique par ID
  getFichesFrais(id: number): Observable<FicheFrais[]> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<FicheFrais[]>(url);
  }

  // Ajouter une nouvelle fiche de frais


  // Add this before your method or in your imports
  ajouterFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    console.log(fiche);
    const url = `${this.apiURL}/save`;
    console.log(url);

    // Define the headers correctly
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Pass the headers in the HTTP request options
    return this.http.post<FicheFrais>(url, fiche, { headers });
  }




  // Supprimer une fiche de frais par ID
  supprimerFicheFrais(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Mettre à jour une fiche de frais
  updateFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    const url = `${this.apiURL}/update`;
    return this.http.put<FicheFrais>(url, fiche, httpOptions);
  }
}
