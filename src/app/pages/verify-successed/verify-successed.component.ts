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
  IonImg
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
    IonImg
  ]
})
export class VerifySuccessedComponent extends BaseComponent {
  countdown = 5;
  private timerSubscription?: Subscription;

  constructor(private router: Router) {
    super();
    addIcons({ closeOutline, checkmarkOutline, arrowForwardOutline });
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
        next: () => {
          this.countdown--;
        },
        complete: () => {
          this.goToHome();
        }
      });
  }

  private stopCountdown() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  goToHome() {
    this.stopCountdown();
    this.router.navigate(['/home']);
  }

  setupProfile() {
    this.stopCountdown();
    this.router.navigate(['/user-profile']);
  }

  close() {
    this.stopCountdown();
    this.router.navigate(['/profile']);
  }
}
