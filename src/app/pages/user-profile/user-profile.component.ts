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
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { UserActions } from '../../store/user/user.actions';
import { selectUserProfile } from '../../store/user/user.selectors';

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
  currentUser = toSignal(this.store.select(selectUserProfile));

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private store: Store
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
    this.authService.logout().pipe(take(1)).subscribe({
      next: () => {
        this.store.dispatch(UserActions.logout());
        this.navCtrl.navigateRoot('/login');
      },
      error: () => {
        this.store.dispatch(UserActions.logout());
        this.navCtrl.navigateRoot('/login');
      }
    });
  }
}
