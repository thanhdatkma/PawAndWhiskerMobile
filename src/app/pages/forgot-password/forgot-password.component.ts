import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonImg,
  IonSpinner,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, callOutline, informationCircleOutline, paw } from 'ionicons/icons';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonImg,
    IonSpinner,
    AppHeaderComponent,
  ],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'mail-outline': mailOutline,
      'call-outline': callOutline,
      'information-circle-outline': informationCircleOutline,
      paw,
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgotForm = this.fb.group({
      identifier: ['', [Validators.required, this.emailOrPhoneValidator]],
    });
  }

  emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^[0-9]{10,11}$/;
    return emailPattern.test(value) || phonePattern.test(value) ? null : { invalidIdentifier: true };
  }

  onResetPassword() {
    if (this.forgotForm.invalid) {
      this.markFormGroupTouched(this.forgotForm);
      return;
    }

    if (this.isLoading) return;

    const email: string = this.forgotForm.value.identifier.trim();
    this.isLoading = true;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.navCtrl.navigateForward('/verify-code', {
          state: { email },
        });
      },
      error: async (err) => {
        this.isLoading = false;
        const message = AuthService.extractMessage(err, 'Failed to send OTP. Please try again.');
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => control.markAsTouched());
  }

  goBack() {
    this.navCtrl.back();
  }
}
