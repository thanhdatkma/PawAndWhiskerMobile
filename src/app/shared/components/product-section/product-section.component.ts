import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from '../product-card/product-card.component';
import { BaseComponent } from '../base-component/base.component';
import { ProductBriefModel } from '../../../models/product-brief.model';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [CommonModule, IonicModule, ProductCardComponent],
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSectionComponent extends BaseComponent {
  @Input({ required: true }) sectionTitle!: string;
  @Input({ required: true }) products: ProductBriefModel[] = [];
  @Input() showSeeAll = true;

  @Output() seeAllClick = new EventEmitter<string>();
  @Output() productAddToCart = new EventEmitter<ProductBriefModel>();
  @Output() productClick = new EventEmitter<ProductBriefModel>();

  onSeeAll(): void {
    this.seeAllClick.emit(this.sectionTitle);
  }

  onAddToCart(product: ProductBriefModel): void {
    this.productAddToCart.emit(product);
  }

  onProductClick(product: ProductBriefModel): void {
    this.productClick.emit(product);
  }

  trackById(_index: number, item: ProductBriefModel): string {
    return item.id;
  }
}
