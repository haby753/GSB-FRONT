import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FicheFrais } from '../models/fiche-frais';
import { FicheFraisService } from '../services/fiche-frais.service';

@Component({
  selector: 'app-consulter-fiche-frais',
  standalone: true,
  imports: [],
  templateUrl: './consulter-fiche-frais.component.html',
  styleUrl: './consulter-fiche-frais.component.css'
})
export class ConsulterFicheFraisComponent implements OnInit, AfterViewInit {
  fichesFrais: FicheFrais[] = [];
  selectedFiche: FicheFrais | null = null;
  recherche = '';
  mois = '';
  etat = '';
  chargement = false;
  erreurChargement = '';
  private vuePrete = false;

  constructor(
    private ficheFraisService: FicheFraisService,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.chargerFiches();
  }

  ngAfterViewInit(): void {
    this.vuePrete = true;
    this.brancherEvenements();
    this.render();
  }

  get fichesFiltrees(): FicheFrais[] {
    const recherche = this.recherche.trim().toLowerCase();
    const mois = this.mois.trim().toLowerCase();
    const etat = this.etat.trim().toLowerCase();

    return this.fichesFrais.filter(fiche => {
      const visiteur = `${fiche.visiteur_id?.prenom || ''} ${fiche.visiteur_id?.nom || ''}`.toLowerCase();
      const statut = fiche.etat_id?.libelle?.toLowerCase() || '';
      const id = String(fiche.id || '');
      const ficheMois = fiche.mois?.toLowerCase() || '';

      const matchRecherche = !recherche || id.includes(recherche) || visiteur.includes(recherche) || ficheMois.includes(recherche) || statut.includes(recherche);
      const matchMois = !mois || ficheMois.includes(mois);
      const matchEtat = !etat || statut.includes(etat);

      return matchRecherche && matchMois && matchEtat;
    });
  }

  get totalMontant(): number {
    return this.fichesFiltrees.reduce((total, fiche) => total + this.getMontant(fiche), 0);
  }

  chargerFiches(): void {
    this.chargement = true;
    this.erreurChargement = '';
    this.render();

    this.ficheFraisService.listeFicheFrais().subscribe({
      next: fiches => {
        this.fichesFrais = Array.isArray(fiches) ? fiches : [];
        this.selectedFiche = this.fichesFrais[0] || null;
        this.chargement = false;
        this.render();
      },
      error: error => {
        console.error('Erreur chargement fiches frais', error);
        this.fichesFrais = [];
        this.selectedFiche = null;
        this.chargement = false;
        this.erreurChargement = "Impossible de charger les fiches de frais. Verifie que l'API /api/fichefrais/all fonctionne.";
        this.render();
      }
    });
  }

  selectionnerFiche(fiche: FicheFrais): void {
    this.selectedFiche = fiche;
    this.render();
  }

  resetFiltres(): void {
    this.recherche = '';
    this.mois = '';
    this.etat = '';
    this.setInputValue('#recherche', '');
    this.setInputValue('#mois', '');
    this.setInputValue('#etat', '');
    this.render();
  }

  getMontant(fiche: FicheFrais): number {
    return fiche.montantvalide ?? fiche.montantValide ?? 0;
  }

  getDate(fiche: FicheFrais): string | null {
    return fiche.date || fiche.dateModif || null;
  }

  private brancherEvenements(): void {
    this.root.querySelector('#refreshFiches')?.addEventListener('click', () => this.chargerFiches());
    this.root.querySelector('#resetFilters')?.addEventListener('click', () => this.resetFiltres());

    this.brancherInput('#recherche', value => this.recherche = value);
    this.brancherInput('#mois', value => this.mois = value);
    this.brancherInput('#etat', value => this.etat = value);

    this.root.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const selectButton = target.closest('[data-select-fiche]') as HTMLElement | null;
      if (!selectButton) return;

      const id = Number(selectButton.dataset['selectFiche']);
      const fiche = this.fichesFrais.find(item => item.id === id);
      if (fiche) {
        this.selectionnerFiche(fiche);
      }
    });
  }

  private brancherInput(selector: string, update: (value: string) => void): void {
    const input = this.root.querySelector(selector) as HTMLInputElement | null;
    input?.addEventListener('input', () => {
      update(input.value);
      this.render();
    });
  }

  private render(): void {
    if (!this.vuePrete) return;

    const fiches = this.fichesFiltrees;
    this.setText('#resultCount', String(fiches.length));
    this.setText('#summaryCount', String(fiches.length));
    this.setText('#summaryTotal', this.formatCurrency(this.totalMontant));
    this.setText('#summarySelection', this.selectedFiche ? `#${this.selectedFiche.id}` : 'Aucune');

    this.renderMessage(fiches);
    this.renderRows(fiches);
    this.renderDetail();
  }

  private renderMessage(fiches: FicheFrais[]): void {
    const message = this.root.querySelector('#searchMessage');
    if (!message) return;

    if (this.chargement) {
      message.innerHTML = '<div class="status-card info">Chargement des fiches de frais...</div>';
      return;
    }

    if (this.erreurChargement) {
      message.innerHTML = `<div class="status-card danger">${this.escapeHtml(this.erreurChargement)}</div>`;
      return;
    }

    if (fiches.length === 0) {
      message.innerHTML = `
        <div class="empty-state">
          <strong>Aucune fiche trouvee</strong>
          <p>Modifiez les filtres ou actualisez la liste des fiches.</p>
        </div>
      `;
      return;
    }

    message.innerHTML = '';
  }

  private renderRows(fiches: FicheFrais[]): void {
    const tableShell = this.root.querySelector('#fichesTableShell') as HTMLElement | null;
    const rows = this.root.querySelector('#ficheRows');
    if (!tableShell || !rows) return;

    tableShell.style.display = !this.chargement && !this.erreurChargement && fiches.length > 0 ? '' : 'none';
    rows.innerHTML = fiches.map(fiche => {
      const selectedClass = this.selectedFiche?.id === fiche.id ? ' class="selected-row"' : '';
      return `
        <tr${selectedClass}>
          <td><span class="id-pill">#${fiche.id}</span></td>
          <td class="strong-cell">${this.escapeHtml(fiche.mois)}</td>
          <td>${this.escapeHtml(fiche.visiteur_id?.prenom || '')} ${this.escapeHtml(fiche.visiteur_id?.nom || '')}</td>
          <td>${fiche.nbJustificatifs}</td>
          <td class="amount">${this.formatCurrency(this.getMontant(fiche))}</td>
          <td><span class="state-badge">${this.escapeHtml(fiche.etat_id?.libelle || 'Non renseigne')}</span></td>
          <td>
            <button type="button" class="action-button edit" data-select-fiche="${fiche.id}">Voir</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  private renderDetail(): void {
    const detail = this.root.querySelector('#ficheDetail');
    if (!detail) return;

    if (!this.selectedFiche) {
      detail.innerHTML = '<div class="empty-mini">Selectionnez une fiche dans la liste pour afficher ses details.</div>';
      return;
    }

    const fiche = this.selectedFiche;
    detail.innerHTML = `
      <div class="detail-card">
        <div class="detail-title">
          <span class="id-pill">#${fiche.id}</span>
          <strong>${this.escapeHtml(fiche.mois)}</strong>
        </div>
        <dl>
          <div>
            <dt>Visiteur</dt>
            <dd>${this.escapeHtml(fiche.visiteur_id?.prenom || '')} ${this.escapeHtml(fiche.visiteur_id?.nom || '')}</dd>
          </div>
          <div>
            <dt>Etat</dt>
            <dd>${this.escapeHtml(fiche.etat_id?.libelle || 'Non renseigne')}</dd>
          </div>
          <div>
            <dt>Justificatifs</dt>
            <dd>${fiche.nbJustificatifs}</dd>
          </div>
          <div>
            <dt>Montant valide</dt>
            <dd>${this.formatCurrency(this.getMontant(fiche))}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>${this.formatDate(this.getDate(fiche))}</dd>
          </div>
        </dl>
      </div>
    `;
  }

  private setText(selector: string, value: string): void {
    const element = this.root.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  }

  private setInputValue(selector: string, value: string): void {
    const input = this.root.querySelector(selector) as HTMLInputElement | null;
    if (input) {
      input.value = value;
    }
  }

  private get root(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
  }

  private formatDate(value: string | null): string {
    if (!value) return 'Non renseignee';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return this.escapeHtml(value);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  }

  private escapeHtml(value: string): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
