import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject } from '@angular/core';
import { TabService } from '../services/tab.service';
import { TabType } from '../models/tab.model';
import { ConfigService } from '../services/config.service';
import { BaseComponent } from '../shared/base-component/base.component';
import { takeUntil } from 'rxjs/operators';
import { OnInit } from '@angular/core';


import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent, IonBadge, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    AppHeaderComponent, IonContent, IonBadge, IonFab, IonFabButton],
})
export class TabsPage extends BaseComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  private tabService = inject(TabService);
  private configService = inject(ConfigService);

  searchBarConfig = new Map<TabType, boolean>();




  constructor() {
    super();
    addIcons({ triangle, ellipse, square });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.configService.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        if (settings?.searchBarTabs) {
          this.searchBarConfig.clear();
          settings.searchBarTabs.forEach(tab => {
            this.searchBarConfig.set(tab as TabType, true);
          });
          // Refresh current tab visibility
          this.tabService.setActiveTab(this.tabService.getActiveTab());
        }
      });
  }


  onScanTap() {
    console.log('Scan tapped');
  }

  onTabChange(event: any) {
    const tab = event.tab as TabType;
    this.tabService.setActiveTab(tab);
  }
}

