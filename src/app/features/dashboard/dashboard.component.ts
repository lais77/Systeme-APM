import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats: any = null;
  statsDepartements: any[] = [];
  chargement = true;

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerStats();
  }

  chargerStats(): void {
    this.http.get(`${this.api}/stats/global`).subscribe({
      next: (data) => {
        this.stats = data;
        this.chargement = false;
      },
      error: () => { this.chargement = false; }
    });

    this.http.get<any[]>(`${this.api}/stats/by-department`).subscribe({
      next: (data) => { this.statsDepartements = data; }
    });
  }
}
