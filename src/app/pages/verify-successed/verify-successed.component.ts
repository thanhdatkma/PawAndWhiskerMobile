import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, checkmarkOutline, arrowForwardOutline } from 'ionicons/icons';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BaseComponent } from '../../shared/components/base-component/base.component';

@Component({
  selector: 'app-verify-successed',
  templateUrl: './verify-successed.component.html',
  styleUrls: ['./verify-successed.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonButtons,
    IonImg,
  ],
})
export class VerifySuccessedComponent extends BaseComponent {
  countdown = 5;
  private timerSubscription?: Subscription;

  private resetToken: string = '';
  private email: string = '';

  constructor(private router: Router) {
    super();
    addIcons({ closeOutline, checkmarkOutline, arrowForwardOutline });

    // Read state immediately in constructor so getCurrentNavigation() is still valid
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.resetToken = nav.extras.state['reset_token'] ?? '';
      this.email = nav.extras.state['email'] ?? '';
    }
  }

  override ngOnInit() {
    this.startCountdown();
  }

  override ngOnDestroy() {
    this.stopCountdown();
  }

  private startCountdown() {
    this.timerSubscription = interval(1000)
      .pipe(take(5))
      .subscribe({
        next: () => { this.countdown--; },
        complete: () => { this.proceedToReset(); },
      });
  }

  private stopCountdown() {
    this.timerSubscription?.unsubscribe();
  }

  private proceedToReset() {
    this.router.navigate(['/reset-password'], {
      state: { reset_token: this.resetToken, email: this.email },
    });
  }

  goToReset() {
    this.stopCountdown();
    this.proceedToReset();
  }

  /** Keep for backwards compat (template may reference it) */
  goToHome() {
    this.stopCountdown();
    this.router.navigate(['/home']);
  }

  close() {
    this.stopCountdown();
    this.router.navigate(['/login']);
  }
}

