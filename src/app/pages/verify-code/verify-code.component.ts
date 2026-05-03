import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonSpinner,
  NavController,
  IonInputOtp,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, refreshOutline, checkmarkCircleOutline, scaleOutline, mailOutline } from 'ionicons/icons';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonText,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonSpinner,
    IonInputOtp,
    AppHeaderComponent,
  ],
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otp: string[] = ['', '', '', '', '', ''];
  countdown = 60;
  timerSubscription?: Subscription;
  isVerifying = false;
  isResending = false;

  /** Raw email forwarded from forgot-password page */
  private rawEmail: string = '';
  /** Masked display version */
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'refresh-outline': refreshOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'scale-outline': scaleOutline,
      'mail-outline': mailOutline,
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.rawEmail = navigation.extras.state['email'] ?? '';
      this.email = this.maskEmail(this.rawEmail);
    }
    this.startTimer();
  }

  private maskEmail(email: string): string {
    if (!email || !email.includes('@')) return email;
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    const maskedPart = '*'.repeat(local.length - 2);
    return `${local.charAt(0)}${maskedPart}${local.charAt(local.length - 1)}@${domain}`;
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer();
    this.countdown = 60;
    this.timerSubscription = interval(1000)
      .pipe(take(60))
      .subscribe({
        next: () => { this.countdown--; },
        complete: () => { this.countdown = 0; },
      });
  }

  stopTimer() {
    this.timerSubscription?.unsubscribe();
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, '').slice(-1);
    this.otp[index] = value;
    input.value = value;

    if (value && index < 5) {
      requestAnimationFrame(() => {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      });
    } else if (value && index === 5) {
      requestAnimationFrame(() => { this.onVerify(); });
    }
  }

  trackByFn(index: number) {
    return index;
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      requestAnimationFrame(() => {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      });
    }
  }

  get isOtpComplete(): boolean {
    return this.otp.every((digit) => digit !== '');
  }

  async onResend() {
    if (this.countdown > 0 || this.isResending || !this.rawEmail) return;

    this.isResending = true;
    this.authService.forgotPassword(this.rawEmail).subscribe({
      next: async () => {
        this.isResending = false;
        this.otp = ['', '', '', '', '', ''];
        this.startTimer();
        const toast = await this.toastCtrl.create({
          message: 'A new OTP has been sent to your email.',
          duration: 2500,
          color: 'success',
          position: 'bottom',
        });
        await toast.present();
      },
      error: async (err) => {
        this.isResending = false;
        const message = AuthService.extractMessage(err, 'Failed to resend OTP.');
        const toast = await this.toastCtrl.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      },
    });
  }

  onVerify() {
    if (!this.isOtpComplete || this.isVerifying) return;

    const code = this.otp.join('');
    this.isVerifying = true;

    this.authService.verifyOtp(this.rawEmail, code).subscribe({
      next: (res) => {
        this.isVerifying = false;
        this.navCtrl.navigateRoot('/verify-successed', {
          state: { reset_token: res.reset_token, email: this.rawEmail },
        });
      },
      error: async (err) => {
        this.isVerifying = false;
        const message = AuthService.extractMessage(err, 'Invalid or expired OTP.');
        const toast = await this.toastCtrl.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'bottom',
        });
        await toast.present();
      },
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}

