import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollYSubject = new BehaviorSubject<number>(0);
  scrollY$ = this.scrollYSubject.asObservable();

  private filterHiddenSubject = new BehaviorSubject<boolean>(false);
  filterHidden$ = this.filterHiddenSubject.asObservable();
  private lastFilterScrollTop = 0;

  private configService = inject(ConfigService);

  updateScroll(y: number) {
    this.scrollYSubject.next(y);
    this.updateFilterVisibility(y);
  }

  private updateFilterVisibility(currentScroll: number) {
    if (this.configService.settings?.disableScrollFadeFilterBar) {
      if (this.filterHiddenSubject.value !== false) {
        this.filterHiddenSubject.next(false);
      }
      return;
    }

    let isHidden = this.filterHiddenSubject.value;

    if (currentScroll <= 50) {
      isHidden = false;
    } else if (currentScroll !== this.lastFilterScrollTop) {
      isHidden = currentScroll > this.lastFilterScrollTop;
    }

    if (isHidden !== this.filterHiddenSubject.value) {
      this.filterHiddenSubject.next(isHidden);
    }
    
    this.lastFilterScrollTop = currentScroll;
  }
}
