import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/tabs/home', icon: 'home' },
    { title: 'Shop', url: '/tabs/home', icon: 'cart' },
    { title: 'My Pets', url: '/tabs/profile', icon: 'paw' },
    { title: 'Favorites', url: '/tabs/home', icon: 'heart' },
    { title: 'Notifications', url: '/tabs/alerts', icon: 'notifications' },
    { title: 'Settings', url: '/tabs/profile', icon: 'settings' },
  ];
  public labels = ['Grooming', 'Vet Visits', 'Orders', 'Food'];

  constructor() {

  }
}
