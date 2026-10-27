import { DatePipe } from '@angular/common';
import { Notifications } from '../../core/models/notifications.interface';
import { NotificationsService } from './../../shared/services/notification/notifications.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [DatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  allNotifications: WritableSignal<Notifications[]> = signal([]);
  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (res) => {
        console.log(res.data.notifications);
        this.allNotifications.set(res.data.notifications);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
