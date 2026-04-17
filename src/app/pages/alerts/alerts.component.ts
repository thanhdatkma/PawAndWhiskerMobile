import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  checkmarkCircleOutline,
  timeOutline,
  giftOutline,
  chevronForwardOutline,
  medicalOutline,
  cubeOutline,
  flaskOutline,
  cutOutline
} from 'ionicons/icons';
import { BaseComponent } from 'src/app/shared/base-component/base.component';
import { NotificationCardItemComponent } from 'src/app/shared/notification-card-item/notification-card-item.component';
import { CommunityAlertsComponent } from 'src/app/shared/community-alerts/community-alerts.component';
import { NotificationModel } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: ['alerts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    NotificationCardItemComponent,
    CommunityAlertsComponent
  ],
})
export class AlertsPageComponent extends BaseComponent implements OnInit {
  private notificationService = inject(NotificationService);
  alerts$: Observable<NotificationModel[]> = this.notificationService.notifications$;

  constructor() {
    super();
    addIcons({
      alertCircleOutline,
      checkmarkCircleOutline,
      timeOutline,
      giftOutline,
      chevronForwardOutline,
      medicalOutline,
      cubeOutline,
      flaskOutline,
      cutOutline
    });
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  ionViewWillEnter() {
    this.notificationService.markAllAsRead();
  }
}
