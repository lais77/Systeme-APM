import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../core/services/api-endpoints';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss'
})
export class ReportingComponent implements OnInit {
  statsDepartements: any[] = [];
  chargement = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerStats();
  }

  chargerStats(): void {
    this.chargement = true;
    this.http.get<any[]>(API.stats.byDepartement).subscribe({
      next: (data) => {
        this.statsDepartements = data;
        this.chargement = false;
      },
      error: () => {
        this.chargement = false;
      }
    });
  }

  exporterExcel(): void {
    // Appel à l'API d'export (qui doit retourner un blob)
    this.http.get(API.stats.export.excel, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Reporting_APM_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error("Erreur lors de l'export Excel", err);
      }
    });
  }
}
