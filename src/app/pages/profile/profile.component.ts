import { Component } from '@angular/core';
import { IonContent, IonIcon, IonImg, IonText, IonButton, IonSpinner, NavController } from '@ionic/angular/standalone';
import { AsyncPipe, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline, paw } from 'ionicons/icons';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthService } from '../../services/auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { selectIsLoggedIn, selectUserProfile, selectUserIsLoading } from '../../store/user/user.selectors';
import { UserActions } from '../../store/user/user.actions';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonImg, IonText, IonButton, IonSpinner, AsyncPipe, RouterLink, NgIf, UserProfileComponent],
})
export class ProfilePageComponent extends BaseComponent {
  isLoggedIn = toSignal(this.store.select(selectIsLoggedIn), { initialValue: false });
  userProfile = toSignal(this.store.select(selectUserProfile));
  isLoadingProfile = toSignal(this.store.select(selectUserIsLoading), { initialValue: false });

  constructor(
    private navCtrl: NavController,
    public authService: AuthService,
  ) {
    super();
    addIcons({
      'settings-outline': settingsOutline,
      'paw': paw
    });
  }

  ionViewWillEnter() {
    if (this.isLoggedIn() && !this.userProfile()) {
      this.store.dispatch(UserActions.loadProfile());
    }
  }

  goToTerms(event: Event) {
    if (event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.navCtrl.navigateForward('/terms-privacy');
  }
}
