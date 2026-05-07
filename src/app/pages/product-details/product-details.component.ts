import { Component, OnInit, HostBinding, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heartOutline, star, chevronForwardOutline, busOutline, refreshOutline, leafOutline, ribbonOutline, paw, removeOutline, addOutline, cartOutline, heart, shareOutline } from 'ionicons/icons';
import { ProductDetailModel } from '../../models/product-detail.model';
import { BreadcrumbModel } from '../../models/breadcrumb.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { FavoriteService } from '../../services/favorite.service';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { ProductActions, selectProductDetail } from 'src/app/store';
import { CurrencyPipe } from '../../pipes/currency-pipe';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ProductCardComponent,
    AppHeaderComponent,
    CurrencyPipe
  ],
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {
  @HostBinding('class.ion-page') ionPage = true;
  quantity = 1;
  selectedWeight = '';
  activeTab = 'info';
  recommendedProducts: ProductBriefModel[] = [];
  productDetail: ProductDetailModel | undefined;
  productDetail$ = this.store.select(selectProductDetail);
  private route = inject(ActivatedRoute);

  breadcrumbList: BreadcrumbModel[] = [
    { label: 'Shop', url: '/' },
    { label: 'Dog Food', url: '/categories' },
    { label: 'Organic Kibble', isActive: true }
  ];

  private productService = inject(ProductService);
 

  constructor(private favoriteService: FavoriteService) {
    super();
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'heart-outline': heartOutline,
      'heart': heart,
      'share-outline': shareOutline,
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
    
    // Get product ID from query params
    const id = this.route.snapshot.queryParams['id'];
    this.store.dispatch(ProductActions.loadProductDetail({ productId: id }));
    this.productDetail$.subscribe(product => {
      if (!product) return;
      this.productDetail = product;
      
      if (this.productDetail?.weights && this.productDetail?.weights.length > 0 && !this.selectedWeight) {
        this.selectedWeight = this.productDetail?.weights[0];
      }
      this.checkFavorite();
    });

    this.loadInitialRecommendations();
  }

  async shareProduct() {
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: this.productDetail?.name,
          text: `Check out this ${this.productDetail?.name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      this.showToast('Sharing not supported on this browser', 'warning');
    }
  }

  loadInitialRecommendations() {
    // Simulate loading 10 items
    // this.recommendedProducts = this.generateMockProducts(10);
  }

  loadMoreProducts(event: any) {
    // setTimeout(() => {
    //   const nextBatch = this.generateMockProducts(10);
    //   this.recommendedProducts = [...this.recommendedProducts, ...nextBatch];
    //   event.target.complete();

    //   // Limit to 40 items for demo
    //   if (this.recommendedProducts.length >= 40) {
    //     event.target.disabled = true;
    //   }
    // }, 1000);
  }

  // private generateMockProducts(count: number): ProductBriefModel[] {
  //   const products = this.productService.getProductsSync();
  //   // Return a slice of products, cycling through if we exceed the total available
  //   return Array.from({ length: count }).map((_, i) => {
  //     const index = (this.recommendedProducts.length + i) % products.length;
  //     return {
  //       ...products[index],
  //       id: `rec-${this.recommendedProducts.length + i}`
  //     };
  //   });
  // }

  checkFavorite() {
    if (!this.productDetail) return;
    this.productDetail.isFavorite = this.favoriteService.isFavorite(this.productDetail.id);
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
    if (this.productDetail) {
      this.productDetail.mainImage = image;
    }
  }
}
