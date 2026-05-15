import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import de from '@angular/common/locales/de';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Formulaire réactif
  isLoading: boolean = false; // Pour gérer l'état de chargement
  errorMessage: string | null = null; // Pour afficher les messages d'erreur
  //authService: any;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserService, // Service d'authentification
    private router: Router // Router pour la redirection
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Champ obligatoire
      password: ['', [Validators.required]] // Champ obligatoire
    });
  }

  onSubmit(): void {
   // event.preventDefault(); // Empêche le rechargement de la page

    // Si le formulaire est invalide, on affiche les erreurs
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Active l'état de chargement
    this.isLoading = true;
    this.errorMessage = null;

    // Récupère les valeurs du formulaire
    const username = this.loginForm.get('username')?.value || '';
    const password = this.loginForm.get('password')?.value || '';
    console.log('tes1', username);

    // Appelle le service d'authentification
    this.UserService.login(username, password).subscribe({
      next: (visiteur: any) => {
        if (visiteur) {
          this.UserService.setVisiteurConnecte(visiteur);
          console.log('Connexion réussie', this.UserService.getVisiteurConnecte());
          this.router.navigate(['/accueil']); // Redirige vers /accueil
        } else {
          console.error('Identifiants incorrects:', visiteur);
          alert('Identifiants incorrects');
        }
      },

    });
}}
