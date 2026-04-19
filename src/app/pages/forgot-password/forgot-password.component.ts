import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, callOutline, informationCircleOutline, paw } from 'ionicons/icons';

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
    IonImg
  ]
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'mail-outline': mailOutline,
      'call-outline': callOutline,
      'information-circle-outline': informationCircleOutline,
      'paw': paw
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgotForm = this.fb.group({
      identifier: ['', [Validators.required, this.emailOrPhoneValidator]]
    });
  }

  emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^[0-9]{10,11}$/;

    if (emailPattern.test(value) || phonePattern.test(value)) {
      return null;
    }

    return { invalidIdentifier: true };
  }

  onResetPassword() {
    if (this.forgotForm.valid) {
      console.log('Reset password request for:', this.forgotForm.value.identifier);
      // Implement password reset logic here
      // For now, navigate back to login as a placeholder
      this.navCtrl.navigateBack('/login');
    } else {
      this.markFormGroupTouched(this.forgotForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
