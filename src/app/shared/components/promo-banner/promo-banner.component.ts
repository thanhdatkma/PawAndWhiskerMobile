import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BaseComponent } from '../base-component/base.component';

export type PromoBannerTheme = 'dog' | 'cat';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './promo-banner.component.html',
  styleUrls: ['./promo-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromoBannerComponent extends BaseComponent {
  /** 'dog' → velveteen gradient (primary); 'cat' → tertiary-container */
  @Input({ required: true }) theme!: PromoBannerTheme;
  @Input() title = 'Food, toys, and essentials';
  @Input() imageUrl?: string;
  @Input() ctaLabel = 'Explore';

  @Output() exploreClick = new EventEmitter<PromoBannerTheme>();

  get isDog(): boolean {
    return this.theme === 'dog';
  }

  onExplore(): void {
    this.exploreClick.emit(this.theme);
  }
}
