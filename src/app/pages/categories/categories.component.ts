import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, AppHeaderComponent]
})
export class CategoriesPageComponent {

  constructor() { }

}
