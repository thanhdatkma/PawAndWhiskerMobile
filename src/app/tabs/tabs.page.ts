import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFooter, IonToolbar, IonContent, IonBadge, IonFab, IonFabButton, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    AppHeaderComponent, IonFooter, IonToolbar, IonContent, IonBadge, IonFab, IonFabButton, IonText],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square });
  }

  onScanTap() {
    console.log('Scan tapped');
  }
}
