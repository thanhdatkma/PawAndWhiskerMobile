import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonContent, IonRefresher, IonRefresherContent, IonList, IonItem, IonLabel, IonToggle, AsyncPipe],
})
export class ProfilePageComponent implements OnInit {

  constructor(public configService: ConfigService) {
    addIcons({ settingsOutline });
  }

  ngOnInit() { }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  onDarkModeToggle() {
    this.configService.toggleDarkMode();
  }

}
