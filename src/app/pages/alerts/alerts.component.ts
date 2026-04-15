import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: ['alerts.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon],
})
export class AlertsPageComponent {
  constructor() { }
}
