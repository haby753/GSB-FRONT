import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Visiteur } from './../models/visiteur';
import { VisiteurService } from '../services/visiteur.service';

@Component({
  selector: 'app-visiteur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VisiteurComponent implements OnInit, AfterViewInit {
  visiteurs: Visiteur[] = [];
  chargement = false;
  erreurChargement = '';
  private vuePrete = false;

  constructor(
    private visiteurService: VisiteurService,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.chargerVisiteurs();
  }

  ngAfterViewInit(): void {
    this.vuePrete = true;
    this.root.querySelector('#refreshVisitors')?.addEventListener('click', () => this.chargerVisiteurs());
    this.root.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const deleteButton = target.closest('[data-delete-visiteur]') as HTMLElement | null;
      if (!deleteButton) return;

      const id = Number(deleteButton.dataset['deleteVisiteur']);
      const visiteur = this.visiteurs.find(item => item.id === id);
      if (visiteur) {
        this.supprimerVisiteur(visiteur);
      }
    });
    this.render();
  }

  chargerVisiteurs(): void {
    this.chargement = true;
    this.erreurChargement = '';
    this.render();

    this.visiteurService.listeVisiteur().subscribe({
      next: visiteurs => {
        this.visiteurs = Array.isArray(visiteurs) ? visiteurs : [];
        this.chargement = false;
        this.render();
      },
      error: err => {
        console.error('Erreur chargement visiteurs', err);
        this.visiteurs = [];
        this.chargement = false;
        this.erreurChargement = "Impossible de charger les visiteurs. L'API /api/visiteur/all renvoie une erreur serveur.";
        this.render();
      },
    });
  }

  supprimerVisiteur(visiteur: Visiteur): void {
    const confirmation = confirm('Confirmer la suppression de ce visiteur ?');
    if (!confirmation) return;

    this.visiteurService.supprimerVisiteur(visiteur.id).subscribe(() => {
      this.chargerVisiteurs();
    });
  }

  private render(): void {
    if (!this.vuePrete) return;

    this.setText('#visiteurCount', String(this.visiteurs.length));
    this.setText('#visiteurTotal', String(this.visiteurs.length));
    this.setText('#visiteurStatus', this.erreurChargement ? 'Erreur API' : this.chargement ? 'Chargement' : 'Disponible');

    this.renderMessage();
    this.renderTable();
    this.renderCards();
  }

  private renderMessage(): void {
    const message = this.root.querySelector('#visitorMessage');
    if (!message) return;

    if (this.chargement) {
      message.innerHTML = '<div class="status-card info">Chargement des visiteurs...</div>';
      return;
    }

    if (this.erreurChargement) {
      message.innerHTML = `<div class="status-card danger">${this.escapeHtml(this.erreurChargement)}</div>`;
      return;
    }

    if (this.visiteurs.length === 0) {
      message.innerHTML = `
        <div class="empty-state">
          <strong>Aucun visiteur trouve</strong>
          <p>Les visiteurs apparaitront ici des que l'API renverra des donnees.</p>
        </div>
      `;
      return;
    }

    message.innerHTML = '';
  }

  private renderTable(): void {
    const tablePanel = this.root.querySelector('#visitorTablePanel') as HTMLElement | null;
    const rows = this.root.querySelector('#visitorRows');
    if (!tablePanel || !rows) return;

    tablePanel.style.display = !this.chargement && !this.erreurChargement && this.visiteurs.length > 0 ? '' : 'none';
    rows.innerHTML = this.visiteurs.map(visiteur => `
      <tr>
        <td><span class="id-pill">#${visiteur.id}</span></td>
        <td class="name-cell">${this.escapeHtml(visiteur.nom)}</td>
        <td>${this.escapeHtml(visiteur.prenom)}</td>
        <td class="address-cell">${this.escapeHtml(visiteur.adresse)}</td>
        <td>${this.escapeHtml(visiteur.ville)}</td>
        <td>${this.escapeHtml(visiteur.cp)}</td>
        <td>${this.formatDate(visiteur.dateEmbauche)}</td>
        <td>
          <button type="button" class="action-button delete" data-delete-visiteur="${visiteur.id}">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
  }

  private renderCards(): void {
    const fichesPanel = this.root.querySelector('#visitorFichesPanel') as HTMLElement | null;
    const cards = this.root.querySelector('#visitorCards');
    if (!fichesPanel || !cards) return;

    fichesPanel.style.display = this.visiteurs.length > 0 ? '' : 'none';
    cards.innerHTML = this.visiteurs.map(visiteur => {
      const fiches = visiteur.fichesFrais || [];
      const rows = fiches.length
        ? `
          <div class="nested-table">
            <table>
              <thead>
                <tr><th>ID</th><th>Date</th><th>Montant</th></tr>
              </thead>
              <tbody>
                ${fiches.map(fiche => `
                  <tr>
                    <td>#${fiche.id}</td>
                    <td>${this.formatDate(fiche.date)}</td>
                    <td>${this.formatCurrency(fiche.montantvalide)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `
        : '<p class="no-fiche">Aucune fiche de frais disponible.</p>';

      return `
        <article class="visitor-card">
          <div class="visitor-card-header">
            <span class="avatar">${this.initiales(visiteur)}</span>
            <div>
              <strong>${this.escapeHtml(visiteur.prenom)} ${this.escapeHtml(visiteur.nom)}</strong>
              <small>${this.escapeHtml(visiteur.ville)} - ${this.escapeHtml(visiteur.cp)}</small>
            </div>
          </div>
          ${rows}
        </article>
      `;
    }).join('');
  }

  private setText(selector: string, value: string): void {
    const element = this.root.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  }

  private get root(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private initiales(visiteur: Visiteur): string {
    return `${visiteur.prenom?.charAt(0) || ''}${visiteur.nom?.charAt(0) || ''}`.toUpperCase();
  }

  private formatDate(value?: string): string {
    if (!value) return 'Non renseignee';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return this.escapeHtml(value);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  }

  private formatCurrency(value?: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
