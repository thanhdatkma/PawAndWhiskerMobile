import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonText, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star, add } from 'ionicons/icons';
import { BaseComponent } from '../base-component/base.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { CurrencyPipe } from '../../pipes/currency-pipe';
import { SoldCountPipe } from '../../pipes/sold-count-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, IonIcon, IonText, IonButton, CurrencyPipe, SoldCountPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent extends BaseComponent {
  @Input({ required: true }) product!: ProductBriefModel;
  /** 'standard' = full card (180px), 'compact' = slim horizontal tile */
  @Input() variant: 'standard' | 'compact' = 'standard';

  @Output() addToCart = new EventEmitter<ProductBriefModel>();
  @Output() toggleFavorite = new EventEmitter<ProductBriefModel>();
  @Output() cardClick = new EventEmitter<ProductBriefModel>();

  constructor() {
    super();
    addIcons({ heart, 'heart-outline': heartOutline, star, add });
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product)
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.product);
  }

  onCardClick(): void {
    this.cardClick.emit(this.product);
  }
}
