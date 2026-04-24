import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseComponent } from '../base-component/base.component';
import { TabService } from '../../../services/tab.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonIcon]
})
export class SearchBarComponent extends BaseComponent {

  /** Placeholder text for the search input */
  @Input() searchPlaceholder = 'Search for food, toys...';

  @Output() searchChange = new EventEmitter<string>();

  searchTerm = '';

  isSearchShrunk = false;
  private lastScrollTop = 0;
  private accumulatedDelta = 0;
  private isAnimating = false;
  private animationTimeout: any;

  private readonly tabService = inject(TabService);

  override ngOnInit(): void {
    this.scrollService.scrollY$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(y => this.handleScroll(y));

    this.tabService.activeTab$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.isSearchShrunk = false;
        this.accumulatedDelta = 0;
      });
  }

  override handleScroll(y: number): void {
    if (this.configService.settings?.disableScrollFadeSearchBar) {
      this.isSearchShrunk = false;
      return;
    }

    const delta = y - this.lastScrollTop;
    this.lastScrollTop = y;

    if (this.isAnimating) {
      this.accumulatedDelta = 0;
      return;
    }

    if ((delta > 0 && this.accumulatedDelta < 0) || (delta < 0 && this.accumulatedDelta > 0)) {
      this.accumulatedDelta = 0;
    }
    
    this.accumulatedDelta += delta;

    if (y <= 50) {
      if (this.isSearchShrunk) {
        this.isSearchShrunk = false;
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      }
    } else {
      if (this.accumulatedDelta > 20 && !this.isSearchShrunk) {
        this.isSearchShrunk = true;
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      } else if (this.accumulatedDelta < -20 && this.isSearchShrunk) {
        this.isSearchShrunk = false;
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      }
    }
  }

  private startAnimationCooldown(): void {
    this.isAnimating = true;
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  onSearchInput(value: string): void {
    this.searchChange.emit(value);
  }

}
