import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  settingsOutline,
  createOutline,
  chevronForwardOutline,
  bagOutline,
  heartOutline,
  cardOutline,
  locationOutline,
  logOutOutline,
  medicalOutline,
  cameraOutline,
  diamond, fitnessOutline, calendarOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonCard,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class UserProfileComponent {
  constructor(
    public authService: AuthService,
    private navCtrl: NavController
  ) {
    addIcons({
      'diamond': diamond,
      'camera-outline': cameraOutline,
      'fitness-outline': fitnessOutline,
      'calendar-outline': calendarOutline,
      'medical-outline': medicalOutline,
      'bag-outline': bagOutline,
      'heart-outline': heartOutline,
      'card-outline': cardOutline,
      'location-outline': locationOutline,
      'log-out-outline': logOutOutline,
      'arrow-back-outline': arrowBackOutline,
      'settings-outline': settingsOutline,
      'create-outline': createOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  onBack() {
    this.navCtrl.navigateRoot('/home');
  }

  onLogout() {
    this.authService.logout();
    // ProfilePageComponent will automatically switch back to guest view via signal
  }
}
