import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PlansService } from '../../../core/services/plans.service';
import { Plan } from '../../../core/models/models';
import { API } from '../../../core/services/api-endpoints';

@Component({
  selector: 'app-mes-plans',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mes-plans.component.html',
  styleUrl: './mes-plans.component.scss'
})
export class MesPlansComponent implements OnInit {
  plans: Plan[] = [];
  chargement = true;
  modalOuvert = false;
  nouveauPlan: any = {};
  processus: any[] = [];

  constructor(private plansService: PlansService, private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerPlans();
    this.chargerProcessus();
  }

  chargerPlans(): void {
    this.plansService.getMesPlans().subscribe({
      next: (data) => { this.plans = data; this.chargement = false; },
      error: () => { this.chargement = false; }
    });
  }

  chargerProcessus(): void {
    this.http.get<any[]>(API.processus.getAll).subscribe({
      next: (data) => { this.processus = data; }
    });
  }

  ouvrirModal(): void {
    this.nouveauPlan = {
      priority: 'Medium',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0]
    };
    this.modalOuvert = true;
  }

  fermerModal(): void { this.modalOuvert = false; }

  creerPlan(): void {
    this.plansService.creerPlan(this.nouveauPlan).subscribe({
      next: () => { this.chargerPlans(); this.fermerModal(); },
      error: (err) => { console.error(err); }
    });
  }

  getPrioriteClass(priority: string): string {
    const classes: any = {
      Critical: 'badge-critique',
      High: 'badge-haute',
      Medium: 'badge-moyenne',
      Low: 'badge-basse'
    };
    return classes[priority] || '';
  }

  cloturerPlan(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Clôturer ce plan ?')) {
      this.plansService.cloturerPlan(id).subscribe({
        next: () => this.chargerPlans()
      });
    }
  }
}