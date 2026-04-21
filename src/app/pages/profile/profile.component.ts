import { Component } from '@angular/core';
import { IonContent, IonIcon, IonImg, IonText, IonButton, NavController } from '@ionic/angular/standalone';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline, paw } from 'ionicons/icons';
import { BaseComponent } from '../../shared/base-component/base.component';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonImg, IonText, IonButton, AsyncPipe, RouterLink, NgIf, UserProfileComponent],
})
export class ProfilePageComponent extends BaseComponent {

  constructor(
    private navCtrl: NavController,
    public authService: AuthService
  ) {
    super();
    addIcons({
      'settings-outline': settingsOutline,
      'paw': paw
    });
  }

  goToTerms(event: Event) {
    if (event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.navCtrl.navigateForward('/terms-privacy');
  }

}
