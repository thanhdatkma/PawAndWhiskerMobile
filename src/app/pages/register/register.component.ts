import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonFooter,
  IonCheckbox,
  IonBackButton,
  IonButtons,
  NavController
} from '@ionic/angular/standalone';
import { BaseComponent } from '../../shared/base-component/base.component';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, lockClosedOutline, personOutline, callOutline, eyeOutline, eyeOffOutline, logoGoogle, logoFacebook, logoTiktok, logoApple, paw } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonFooter,
    IonCheckbox,
    IonBackButton,
    IonButtons,
    RouterLink
  ]
})
export class RegisterComponent extends BaseComponent implements OnInit {
  @ViewChild('registerTitle', { static: false }) registerTitle!: ElementRef;

  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    super();
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'person-outline': personOutline,
      'call-outline': callOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'logo-google': logoGoogle,
      'logo-facebook': logoFacebook,
      'logo-tiktok': logoTiktok,
      'logo-apple': logoApple,
      'paw': paw
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initForm();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.registerTitle?.nativeElement?.focus();
    }, 100);
  }

  initForm() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
      // Implement registration API integration here
      this.navCtrl.navigateForward('/verify-code', {
        state: { email: this.registerForm.value.email }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  onSocialLogin(provider: string) {
    console.log('Social login with:', provider);
  }

  onSignIn() {
    this.navCtrl.navigateBack('/login');
  }

  goToTerms(event: Event) {
    if (event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.navCtrl.navigateForward('/terms-privacy');
  }

  goToPrivacy(event: Event) {
    if (event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.navCtrl.navigateForward('/privacy-policy');
  }
}
