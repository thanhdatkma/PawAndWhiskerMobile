import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  NavController,
  IonInput
} from '@ionic/angular/standalone';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, logoGoogle, logoApple, paw } from 'ionicons/icons';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { UserActions } from '../../store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    AppHeaderComponent
  ]
})
export class LoginComponent extends BaseComponent implements OnInit {
  @ViewChild('loginTitle', { static: false }) loginTitle!: ElementRef;
  @ViewChild('emailInput', { static: false }) emailInput!: IonInput;

  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    super();
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'mail-outline': mailOutline,
      'lock-closed-outline': lockClosedOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'logo-google': logoGoogle,
      'logo-apple': logoApple,
      'paw': paw
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initForm();
  }

  ionViewDidEnter() {
    // Focus the title for screen readers
    setTimeout(() => {
      this.loginTitle?.nativeElement?.focus();
    }, 100);
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(UserActions.login({ email, password }));
    } else {
      this.markFormGroupTouched(this.loginForm);
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
    this.navCtrl.navigateBack('/profile');
  }

  onFaceIdLogin() {
    console.log('Face ID login clicked');
    // Implement biometric auth logic here
  }

  onSocialLogin(provider: string) {
    console.log('Social login with:', provider);
  }

  onForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }

  onRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
