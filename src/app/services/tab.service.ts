import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabType } from '../models/tab.model';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private activeTabSubject = new BehaviorSubject<TabType>(TabType.HOME);
  public activeTab$ = this.activeTabSubject.asObservable();

  setActiveTab(tab: TabType): void {
    this.activeTabSubject.next(tab);
  }

  getActiveTab(): TabType {
    return this.activeTabSubject.value;
  }
}
