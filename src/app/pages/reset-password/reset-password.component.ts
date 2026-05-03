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
  IonSpinner,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, eyeOutline, eyeOffOutline, arrowBackOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
    IonSpinner,
    AppHeaderComponent,
  ],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isLoading = false;
  showNewPassword = false;
  showConfirmPassword = false;

  private resetToken: string = '';
  private email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    addIcons({ lockClosedOutline, eyeOutline, eyeOffOutline, arrowBackOutline });

    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.resetToken = nav.extras.state['reset_token'] ?? '';
      this.email = nav.extras.state['email'] ?? '';
    }
  }

  ngOnInit() {
    this.resetForm = this.fb.group(
      {
        new_password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('new_password')?.value;
    const cpw = group.get('confirm_password')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      Object.values(this.resetForm.controls).forEach((c) => c.markAsTouched());
      return;
    }

    if (this.isLoading) return;

    if (!this.resetToken || !this.email) {
      this.showToast('Reset session expired. Please start over.', 'danger');
      this.navCtrl.navigateRoot('/forgot-password');
      return;
    }

    this.isLoading = true;
    const { new_password, confirm_password } = this.resetForm.value;

    this.authService.resetPassword(this.email, this.resetToken, new_password, confirm_password).subscribe({
      next: async () => {
        this.isLoading = false;
        await this.showToast('Password reset successfully! Please log in.', 'success');
        this.navCtrl.navigateRoot('/login');
      },
      error: async (err) => {
        this.isLoading = false;
        const message = AuthService.extractMessage(err, 'Failed to reset password. Please try again.');
        await this.showToast(message, 'danger');
      },
    });
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color, position: 'bottom' });
    await toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
