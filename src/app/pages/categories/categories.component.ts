import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonRefresher, IonRefresherContent, AppHeaderComponent]
})
export class CategoriesPageComponent {
  private readonly scrollService = inject(ScrollService);

  constructor() { }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  handleScroll(ev: any) {
    this.scrollService.updateScroll(ev.detail.scrollTop);
  }

}
