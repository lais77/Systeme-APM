import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API } from '../../core/services/api-endpoints';
import { Notification } from '../../core/models/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  chargement = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chargerNotifications();
  }

  chargerNotifications(): void {
    this.chargement = true;
    this.http.get<Notification[]>(API.notifications.getMes).subscribe({
      next: (data) => {
        this.notifications = data;
        this.chargement = false;
      },
      error: () => {
        this.chargement = false;
      }
    });
  }

  marquerCommeLu(id: number): void {
    this.http.put(API.notifications.markRead(id), {}).subscribe({
      next: () => {
        const notif = this.notifications.find(n => n.id === id);
        if (notif) notif.lu = true;
      }
    });
  }

  marquerToutCommeLu(): void {
    this.http.put(API.notifications.markAllRead, {}).subscribe({
      next: () => {
        this.notifications.forEach(n => n.lu = true);
      }
    });
  }
}
