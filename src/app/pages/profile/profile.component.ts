import { Component } from '@angular/core';
import { IonContent, IonIcon, IonImg, IonText, IonButton } from '@ionic/angular/standalone';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline, paw } from 'ionicons/icons';
import { BaseComponent } from '../../shared/base-component/base.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonImg, IonText, IonButton, AsyncPipe, RouterLink],
})
export class ProfilePageComponent extends BaseComponent {

  constructor(public configService: ConfigService) {
    super();
    addIcons({ settingsOutline, paw });
  }

}
