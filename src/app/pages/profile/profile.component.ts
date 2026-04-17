import { Component } from '@angular/core';
import { IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonToggle, AsyncPipe],
})
export class ProfilePageComponent extends BaseComponent {

  constructor(public configService: ConfigService) {
    super();
    addIcons({ settingsOutline });
  }

  onDarkModeToggle() {
    this.configService.toggleDarkMode();
  }

}
