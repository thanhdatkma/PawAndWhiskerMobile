import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
  IonToggle,
  IonLabel,
  IonList,
  IonItem
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

export interface AlertModel {
  id: string;
  type: 'critical' | 'confirmed' | 'recurring' | 'special-offer';
  icon: string;
  category: string;
  highlight: string;
  title: string;
  description?: string;
  actionText?: string;
  isInteractive?: boolean;
}

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
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonButton,
    IonIcon,
    IonToggle,
    IonLabel,
    IonList,
    IonItem
  ],
})
export class AlertsPageComponent extends BaseComponent {
  medicationConfirmed = false;

  alerts: AlertModel[] = [
    {
      id: 'a1',
      type: 'critical',
      icon: 'assets/icons/medical.svg',
      category: 'Medical',
      highlight: 'Critical',
      title: 'Sắp đến lịch tiêm vắc-xin',
      description: 'Vắc-xin dại (hàng năm) cho Max cần được tiêm trước ngày 25/05/2026 tại phòng khám Paws Health.',
      actionText: 'Đặt hẹn khám ngay'
    },
    {
      id: 'a2',
      type: 'confirmed',
      icon: 'assets/icons/delivery.svg',
      category: 'Delivery',
      highlight: 'Confirmed',
      title: 'Đơn hàng của bạn đã được giao',
      description: 'Gói đồ chơi và pate hữu cơ \'Organi-Treats\' cho Max đã được giao đến cửa hàng.',
      actionText: 'Xem đơn hàng'
    },
    {
      id: 'a3',
      type: 'recurring',
      icon: 'assets/icons/medication.svg',
      category: 'Medication',
      highlight: 'Recurring',
      title: 'Nhắc nhở thuốc PawsGuard',
      isInteractive: true
    },
    {
      id: 'a4',
      type: 'special-offer',
      icon: 'assets/icons/service.svg',
      category: 'Service',
      highlight: 'Special Offer',
      title: 'Ưu đãi đặc biệt: Gói Spa \'Groom & Glow\'',
      description: 'Giảm 15% gói spa toàn diện cho Max. Đặt ngay để nhận ưu đãi!',
      actionText: 'Xem ưu đãi'
    }
  ];

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

  onMedicationToggle(event: any) {
    this.medicationConfirmed = event.detail.checked;
  }
}
