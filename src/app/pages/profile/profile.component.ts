import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile.page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon],
})
export class ProfilePageComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
