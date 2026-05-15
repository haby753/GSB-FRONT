import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Interface pour le typage fort
export interface Visiteur {
  id: number;
  username: string;
  nom?: string;
  prenom?: string;
  // Ajoutez d'autres propriétés selon votre API
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private visiteurConnecte = new BehaviorSubject<Visiteur | null>(null);
  private readonly STORAGE_KEY = 'currentUser';
  private readonly API_URL = '/api/visiteur';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Tentative de récupération de l'utilisateur depuis le localStorage
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.visiteurConnecte.next(user);
      } catch (e) {
        this.clearUserData();
      }
    }
  }

  /**
   * Login avec username et password
   */
  login(username: string, password: string): Observable<Visiteur> {
    return this.http.post<Visiteur>(`${this.API_URL}/login`, { username, password }).pipe(
      tap(user => {
        console.log("test service réussi ");
        this.storeUserData(user);
        this.visiteurConnecte.next(user);
      }),
      catchError(error => {
        this.clearUserData();
        return throwError(() => new Error('Échec de la connexion'));
      })
    );
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.clearUserData();
    this.router.navigate(['/login']);
  }

  /**
   * Récupère l'observable de l'utilisateur connecté
   */
  getVisiteurConnecte(): Observable<Visiteur | null> {
    return this.visiteurConnecte.asObservable();
  }

  /**
   * Récupère la valeur actuelle (sans observable)
   */
  getCurrentVisiteur(): Visiteur | null {
    return this.visiteurConnecte.value;
  }

  /**
   * Met à jour l'utilisateur connecté
   */
  setVisiteurConnecte(visiteur: Visiteur): void {
    this.storeUserData(visiteur);
    this.visiteurConnecte.next(visiteur);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.visiteurConnecte.value !== null;
  }

  // Méthodes privées
  private storeUserData(user: Visiteur): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private clearUserData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.visiteurConnecte.next(null);
  }}
