import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonButton,
  NavController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';
import {
  arrowBackOutline,
  hammerOutline,
  informationCircleOutline,
  personOutline,
  shieldCheckmarkOutline,
  documentTextOutline,
  warningOutline,
  mailOutline,
  checkmarkCircleOutline,
  pawOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonIcon,
    IonButton,
    AppHeaderComponent
  ]
})
export class TermsConditionsComponent implements OnInit {

  constructor(private navCtrl: NavController) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'hammer-outline': hammerOutline,
      'information-circle-outline': informationCircleOutline,
      'person-outline': personOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'document-text-outline': documentTextOutline,
      'warning-outline': warningOutline,
      'mail-outline': mailOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'paw-outline': pawOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  ngOnInit() { }

  goBack() {
    this.navCtrl.back();
  }

  onAccept() {
    this.navCtrl.back();
  }

  onContactUs() {
    console.log('Contact Us clicked');
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToPrivacy() {
    this.navCtrl.navigateForward('/privacy-policy');
  }
}
