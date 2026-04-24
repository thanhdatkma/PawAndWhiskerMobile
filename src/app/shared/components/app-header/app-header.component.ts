import { Component, EventEmitter, Input, Output, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonButtons, IonButton, IonText, IonIcon, IonMenuButton, IonHeader, IonBackButton } from '@ionic/angular/standalone';
import { BaseComponent } from '../base-component/base.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TabService } from '../../../services/tab.service';
import { TabType } from '../../../models/tab.model';
import { addIcons } from 'ionicons';
import { cartOutline, chevronBack, search, shareOutline, heartOutline, heart } from 'ionicons/icons';
import { takeUntil } from 'rxjs/operators';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonMenuButton, CommonModule, IonHeader, IonText, SearchBarComponent, IonBackButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    addIcons({ 'cart-outline': cartOutline, 'chevron-back': chevronBack, search, 'share-outline': shareOutline, 'heart-outline': heartOutline, heart });
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
  /** Whether to show the share icon button */
  @Input() showShare = false;
  /** Whether to show the favorite icon button */
  @Input() showFavorite = false;
  /** Product ID for favorite service integration */
  @Input() productId?: string;


  @Output() shareClick = new EventEmitter<void>();

  private readonly tabService = inject(TabService);
  public readonly favoriteService = inject(FavoriteService);
  private readonly cdr = inject(ChangeDetectorRef);



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
    this.cdr.markForCheck();
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
        this.cdr.markForCheck();
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      }
    } else {
      if (this.accumulatedDelta > 20 && !this.isHeaderShrunk) {
        this.isHeaderShrunk = true;
        this.cdr.markForCheck();
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      } else if (this.accumulatedDelta < -20 && this.isHeaderShrunk) {
        this.isHeaderShrunk = false;
        this.cdr.markForCheck();
        this.startAnimationCooldown();
        this.accumulatedDelta = 0;
      }
    }
  }

  private startAnimationCooldown(): void {
    this.isAnimating = true;
    this.cdr.markForCheck();
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.isAnimating = false;
      this.cdr.markForCheck();
    }, 400); // 400ms cooldown gives enough time for layout bounce to settle
  }

  onShareClick(): void { this.shareClick.emit(); }
  onFavoriteClick(): void {
    if (this.productId) {
      this.favoriteService.toggleFavorite(this.productId);
    }
  }


}
