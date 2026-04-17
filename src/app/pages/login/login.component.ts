import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, logoGoogle, logoApple, paw } from 'ionicons/icons';

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
    IonImg
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    addIcons({ arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, logoGoogle, logoApple, paw });
  }

  ngOnInit() {
    this.initForm();
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
      console.log('Login data:', this.loginForm.value);
      // Implement auth logic here
      this.navCtrl.navigateRoot('/home');
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
    this.navCtrl.back();
  }

  onFaceIdLogin() {
    console.log('Face ID login clicked');
    // Implement biometric auth logic here
  }

  onSocialLogin(provider: string) {
    console.log('Social login with:', provider);
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  onRegister() {
    console.log('Navigate to register');
  }
}
