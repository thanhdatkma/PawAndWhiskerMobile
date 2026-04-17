import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, 
  IonText, 
  IonButton, 
  IonToggle, 
  IonLabel 
} from '@ionic/angular/standalone';
import { NotificationModel } from 'src/app/models/notification.model';

@Component({
  selector: 'app-notification-card-item',
  templateUrl: './notification-card-item.component.html',
  styleUrls: ['./notification-card-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonText,
    IonButton,
    IonToggle,
    IonLabel
  ]
})
export class NotificationCardItemComponent implements OnInit {
  @Input() notification!: NotificationModel;
  
  medicationConfirmed = false;

  constructor() { }

  ngOnInit() {}

  onMedicationToggle(event: any) {
    this.medicationConfirmed = event.detail.checked;
  }
}
