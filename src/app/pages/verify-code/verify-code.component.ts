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
  NavController,
  IonInputOtp
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, refreshOutline, checkmarkCircleOutline, scaleOutline, mailOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';

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
    IonInputOtp
  ]
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otp: string[] = ['', '', '', '', '', ''];
  countdown = 60;
  timerSubscription?: Subscription;
  email: string = 'n**********g@gmail.com'; // Default or from navigation state

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'refresh-outline': refreshOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'scale-outline': scaleOutline,
      'mail-outline': mailOutline
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const rawEmail = navigation.extras.state['email'];
      this.email = this.maskEmail(rawEmail);
    }
    this.startTimer();
  }

  private maskEmail(email: string): string {
    if (!email || !email.includes('@')) return email;
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    const firstChar = local.charAt(0);
    const lastChar = local.charAt(local.length - 1);
    const maskedPart = '*'.repeat(local.length - 2);
    return `${firstChar}${maskedPart}${lastChar}@${domain}`;
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
        next: () => {
          this.countdown--;
        },
        complete: () => {
          this.countdown = 0;
        }
      });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    let value = input.value;

    // Filter to only numbers and take the last digit
    value = value.replace(/[^0-9]/g, '').slice(-1);

    this.otp[index] = value;
    input.value = value;

    if (value && index < 5) {
      // Use requestAnimationFrame to defer focus until after the current event loop
      // This prevents the next input from capturing the same keystroke
      requestAnimationFrame(() => {
        const inputs = this.otpInputs.toArray();
        inputs[index + 1].nativeElement.focus();
      });
    } else if (value && index === 5) {
      // Auto-verify if the last digit is entered
      requestAnimationFrame(() => {
        this.onVerify();
      });
    }
  }

  trackByFn(index: number) {
    return index;
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otp[index] && index > 0) {
        requestAnimationFrame(() => {
          const inputs = this.otpInputs.toArray();
          inputs[index - 1].nativeElement.focus();
        });
      }
    }
  }

  get isOtpComplete(): boolean {
    return this.otp.every(digit => digit !== '');
  }

  onResend() {
    if (this.countdown === 0) {
      this.startTimer();
      // Logic to resend OTP via API
      console.log('Resending OTP...');
    }
  }

  onVerify() {
    if (this.isOtpComplete) {
      const code = this.otp.join('');
      console.log('Verifying code:', code);
      // Logic to verify OTP via API
      this.navCtrl.navigateRoot('/verify-successed');
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
