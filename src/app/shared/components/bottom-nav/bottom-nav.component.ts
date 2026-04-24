import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar, IonText, IonTabButton, IonIcon, IonLabel, IonButton, IonFab, IonFabButton, IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  imports: [IonFooter, IonToolbar, IonText, IonTabButton, IonIcon, IonLabel, IonButton, IonFab, IonFabButton, IonBadge],
})
export class BottomNavComponent implements OnInit {
  currentTab = 'home';
  constructor() { }

  ngOnInit() { }

  onScanTap() {
    console.log('Scan tapped');
  }

  goToTab(tab: string) {
    this.currentTab = tab;
  }

}
