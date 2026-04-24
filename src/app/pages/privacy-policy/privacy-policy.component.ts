import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
  IonButton,
  NavController,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import {
  arrowBackOutline,
  searchOutline,
  shieldCheckmarkOutline,
  bandageOutline,
  serverOutline,
  analyticsOutline,
  lockClosedOutline,
  shareSocialOutline,
  optionsOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonIcon,
    IonButton,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    AppHeaderComponent
  ]
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private navCtrl: NavController) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'search-outline': searchOutline,
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'bandage-outline': bandageOutline,
      'server-outline': serverOutline,
      'analytics-outline': analyticsOutline,
      'lock-closed-outline': lockClosedOutline,
      'share-social-outline': shareSocialOutline,
      'options-outline': optionsOutline,
      'checkmark-circle-outline': checkmarkCircleOutline
    });
  }

  ngOnInit() { }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
