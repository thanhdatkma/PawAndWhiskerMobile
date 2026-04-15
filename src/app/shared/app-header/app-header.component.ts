import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton, IonTitle, IonHeader } from '@ionic/angular/standalone';
import { BaseComponent } from '../base-component/base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton, IonTitle, CommonModule, FormsModule, IonHeader]
})
export class AppHeaderComponent extends BaseComponent {

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

  searchTerm = '';

  onMenuClick(): void { this.menuClick.emit(); }
  onCartClick(): void { this.cartClick.emit(); }
  onSearchInput(value: string): void { this.searchChange.emit(value); }

}
