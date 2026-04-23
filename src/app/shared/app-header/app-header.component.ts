import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { IonButtons, IonButton, IonText, IonIcon, IonMenuButton, IonHeader, IonBackButton } from '@ionic/angular/standalone';
import { BaseComponent } from '../base-component/base.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TabService } from '../../services/tab.service';
import { TabType } from '../../models/tab.model';
import { addIcons } from 'ionicons';
import { cartOutline, chevronBack, search } from 'ionicons/icons';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonMenuButton, CommonModule, IonHeader, IonText, SearchBarComponent, IonBackButton]
})
export class AppHeaderComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    addIcons({ 'cart-outline': cartOutline, 'chevron-back': chevronBack, search });
  }

  /** Main title shown in the center / beside avatar */
  @Input() title = 'Paws & Whiskers';
  /** Subtitle shown under username area */
  @Input() subtitle?: string;
  /** User avatar URL — when set, shows avatar + name layout instead of centred app title */
  @Input() avatarUrl?: string;
  /** Whether to show the cart icon button */
  @Input() showCart = true;
  /** Whether to render an inline search bar below the title row */
  @Input() showSearch = false;
  /** Whether to show back button instead of menu button */
  @Input() showBackButton = false;
  /** Default href for back button */
  @Input() backButtonDefaultHref = '/';
  /** Placeholder text for the search input */
  @Input() searchPlaceholder = 'Search for food, toys...';
  /** Configuration Map to determine visibility of search bar per tab */
  @Input() searchBarConfig: Map<TabType, boolean> = new Map();


  @Output() menuClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  private readonly tabService = inject(TabService);


  isHeaderShrunk = false;
  private lastScrollTop = 0;
  private accumulatedDelta = 0;
  private isAnimating = false;
  private animationTimeout: any;

  override ngOnInit(): void {
    this.scrollService.scrollY$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(y => this.handleScroll(y));

    this.tabService.activeTab$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(tab => {
        if (this.searchBarConfig && this.searchBarConfig.size > 0) {
          this.updateSearchVisibility(tab);
        }
      });
  }

  private updateSearchVisibility(activeTab: TabType): void {
    this.showSearch = !!this.searchBarConfig.get(activeTab);
  }

  override handleScroll(y: number): void {
    if (this.configService.settings?.disableScrollFadeSearchBar) {
      this.isHeaderShrunk = false;
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

    if (y <= 60) {
      if (this.isHeaderShrunk) {
        this.isHeaderShrunk = false;
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      }
    } else {
      if (this.accumulatedDelta > 20 && !this.isHeaderShrunk) {
        this.isHeaderShrunk = true;
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      } else if (this.accumulatedDelta < -20 && this.isHeaderShrunk) {
        this.isHeaderShrunk = false;
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
    }, 400); // 400ms cooldown gives enough time for layout bounce to settle
  }

  onMenuClick(): void { this.menuClick.emit(); }
  onCartClick(): void { this.cartClick.emit(); }
  onSearchInput(value: string): void { this.searchChange.emit(value); }

}
