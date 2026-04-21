import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, HostBinding } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonBadge, IonFooter, IonText, IonGrid, IonRow, IonCol, IonImg, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { BaseComponent } from '../../shared/base-component/base.component';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heartOutline, star, chevronForwardOutline, busOutline, refreshOutline, leafOutline, ribbonOutline, paw, removeOutline, addOutline, cartOutline, heart } from 'ionicons/icons';
import { ProductDetailModel } from '../../models/product-detail.model';
import { BreadcrumbModel } from '../../models/breadcrumb.model';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductBriefModel } from '../../models/product-brief.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonBadge, IonFooter, IonText, IonGrid, IonRow, IonCol, IonImg, IonInfiniteScroll, IonInfiniteScrollContent,
    ProductCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {
  @HostBinding('class.ion-page') ionPage = true;
  quantity = 1;
  selectedWeight = '';
  activeTab = 'info';
  recommendedProducts: ProductBriefModel[] = [];

  breadcrumbList: BreadcrumbModel[] = [
    { label: 'Shop', url: '/' },
    { label: 'Dog Food', url: '/categories' },
    { label: 'Organic Kibble', isActive: true }
  ];

  product: ProductDetailModel = {
    id: 'na1',
    name: 'Organic Royal Canin Kibble',
    price: 35.00,
    discountPrice: 29.75,
    discountPct: 15,
    rating: 4.8,
    reviewCount: 120,
    images: [
      './assets/images/detail-1.png',
      './assets/images/detail-2.png',
      './assets/images/detail-3.png',
      './assets/images/detail-3.png',
      './assets/images/detail-3.png',
      './assets/images/detail-3.png'
    ],
    mainImage: './assets/images/detail-1.png',
    description: `Treat your furry companion to the finest nutrition with our Organic Royal Canin Kibble. Specially formulated for adult dogs, this premium blend combines high-quality proteins with essential vitamins and minerals to support overall vitality and a shiny coat.`,
    breadcrumbs: this.breadcrumbList,
    weights: ['2kg', '5kg', '10kg']
  };

  constructor() {
    super();
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'heart-outline': heartOutline,
      'heart': heart,
      'star': star,
      'chevron-forward-outline': chevronForwardOutline,
      'bus-outline': busOutline,
      'refresh-outline': refreshOutline,
      'leaf-outline': leafOutline,
      'ribbon-outline': ribbonOutline,
      'paw': paw,
      'remove-outline': removeOutline,
      'add-outline': addOutline,
      'cart-outline': cartOutline
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    if (this.product.weights && this.product.weights.length > 0) {
      this.selectedWeight = this.product.weights[0];
    }
    this.checkFavorite();
    this.loadInitialRecommendations();
  }

  loadInitialRecommendations() {
    // Simulate loading 10 items
    this.recommendedProducts = this.generateMockProducts(10);
  }

  loadMoreProducts(event: any) {
    setTimeout(() => {
      const nextBatch = this.generateMockProducts(10);
      this.recommendedProducts = [...this.recommendedProducts, ...nextBatch];
      event.target.complete();

      // Limit to 40 items for demo
      if (this.recommendedProducts.length >= 40) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  private generateMockProducts(count: number): ProductBriefModel[] {
    const products: ProductBriefModel[] = [];
    const baseId = this.recommendedProducts.length;
    for (let i = 1; i <= count; i++) {
      products.push({
        id: `rec-${baseId + i}`,
        name: `Premium Dog Food ${baseId + i}`,
        coverImage: `./assets/images/detail-${(i % 3) + 1}.png`,
        price: 25.00 + i,
        discountPrice: 20.00 + i,
        discountPct: 20,
        rating: 4.5,
        reviewCount: 50 + i,
        categoryName: 'Dog Food'
      });
    }
    return products;
  }

  checkFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.product.isFavorite = favorites.includes(this.product.id);
  }

  toggleFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.product.isFavorite) {
      favorites = favorites.filter((id: string) => id !== this.product.id);
      this.product.isFavorite = false;
    } else {
      favorites.push(this.product.id);
      this.product.isFavorite = true;
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  goBack() {
    this.nav.back();
  }

  setWeight(weight: string) {
    this.selectedWeight = weight;
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  setMainImage(image: string) {
    this.product.mainImage = image;
  }
}
