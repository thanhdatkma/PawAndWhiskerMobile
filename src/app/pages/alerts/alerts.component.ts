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
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { NotificationCardItemComponent } from '../../shared/components/notification-card-item/notification-card-item.component';
import { CommunityAlertsComponent } from '../../shared/components/community-alerts/community-alerts.component';
import { NotificationModel } from '../../models/notification.model';
import { NotificationService } from '../../services/notification.service';
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
      'alert-circle-outline': alertCircleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'time-outline': timeOutline,
      'gift-outline': giftOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'medical-outline': medicalOutline,
      'cube-outline': cubeOutline,
      'flask-outline': flaskOutline,
      'cut-outline': cutOutline
    });
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  ionViewWillEnter() {
    this.notificationService.markAllAsRead();
  }
}
