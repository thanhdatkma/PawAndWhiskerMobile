import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { IonButtons, IonButton, IonIcon, IonMenuButton, IonHeader } from '@ionic/angular/standalone';
import { BaseComponent } from '../base-component/base.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ScrollService } from '../../core/services/scroll.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonMenuButton, CommonModule, IonHeader, SearchBarComponent]
})
export class AppHeaderComponent extends BaseComponent implements OnInit {

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
  /** Placeholder text for the search input */
  @Input() searchPlaceholder = 'Search for food, toys...';

  @Output() menuClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  private readonly scrollService = inject(ScrollService);

  isHeaderShrunk = false;

  override ngOnInit(): void {
    this.scrollService.scrollY$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(y => this.handleScroll(y));
  }

  private handleScroll(y: number): void {
    // 0 to 60px: Header is normal
    if (y <= 60) {
      this.isHeaderShrunk = false;
    }
    // Beyond 60px: Header title shrinks
    else {
      this.isHeaderShrunk = true;
    }
  }

  onMenuClick(): void { this.menuClick.emit(); }
  onCartClick(): void { this.cartClick.emit(); }
  onSearchInput(value: string): void { this.searchChange.emit(value); }

}
