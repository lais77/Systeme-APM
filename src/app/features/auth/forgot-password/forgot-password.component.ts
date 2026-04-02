import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Mot de passe oublié</h2>
        <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>

        <div class="form-group">
          <input type="email" [(ngModel)]="email" placeholder="votre@email.com" />
        </div>

        <div class="succes" *ngIf="succes">Email envoyé ! Vérifiez votre boîte mail.</div>
        <div class="erreur" *ngIf="erreur">{{ erreur }}</div>

        <button (click)="onSubmit()" [disabled]="chargement">
          {{ chargement ? 'Envoi...' : 'Envoyer le lien' }}
        </button>

        <a routerLink="/auth/login">Retour à la connexion</a>
      </div>
    </div>
  `,
  styles: [`
    .container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f5f5f5; }
    .card { background: white; border-radius: 12px; padding: 2.5rem; width: 100%; max-width: 400px; box-shadow: 0 2px 16px rgba(0,0,0,0.08); }
    h2 { margin-bottom: 0.5rem; }
    p { color: #888; font-size: 0.875rem; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.95rem; }
    button { width: 100%; padding: 0.875rem; background: #1a73e8; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-bottom: 1rem; }
    button:disabled { background: #9dc3f7; }
    a { display: block; text-align: center; color: #1a73e8; font-size: 0.875rem; text-decoration: none; }
    .succes { background: #e8f5e9; color: #2e7d32; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.875rem; }
    .erreur { background: #fdecea; color: #c62828; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.875rem; }
  `]
})
export class ForgotPasswordComponent {
  email = '';
  succes = false;
  erreur = '';
  chargement = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.email) { this.erreur = 'Veuillez entrer votre email.'; return; }
    this.chargement = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: () => { this.succes = true; this.chargement = false; },
      error: () => { this.erreur = 'Erreur lors de l\'envoi.'; this.chargement = false; }
    });
  }
}