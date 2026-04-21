import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { BannerSliderComponent } from '../../shared/banner-slider/banner-slider.component';
import { QuickCategoryGridComponent } from '../../shared/quick-category-grid/quick-category-grid.component';
import { QuickCategoryModel } from '../../models/quick-category.model';
import { BaseComponent } from '../../shared/base-component/base.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { ProductSectionComponent } from '../../shared/product-section/product-section.component';
import { PromoBannerComponent } from '../../shared/promo-banner/promo-banner.component';
import { NewsBriefModel } from '../../models/news-brief.model';
import { NewsFeedComponent } from '../../shared/news-feed/news-feed.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonRefresher, IonRefresherContent,
    BannerSliderComponent, QuickCategoryGridComponent,
    ProductSectionComponent, PromoBannerComponent, NewsFeedComponent
  ],
})
export class HomePageComponent extends BaseComponent {
  activeId = 'dog'
  categories: QuickCategoryModel[] = [
    { id: 'dog', title: 'Dog', iconName: 'pets', type: 'product' },
    { id: 'cat', title: 'Cat', iconName: 'cruelty_free', type: 'product' },
    { id: 'clinic', title: 'Clinic', iconName: 'medical_services', type: 'service' },
    { id: 'services', title: 'Services', iconName: 'content_cut', type: 'service' },
    { id: 'accessories', title: 'Accessories', iconName: 'shopping_bag', type: 'product' },
    { id: 'pharmacy', title: 'Pharmacy', iconName: 'medication', type: 'product' }
  ];

  newArrivals: ProductBriefModel[] = [
    { id: 'na1', name: 'Organic Royal Canin Kibble', coverImage: 'assets/images/asset_1.png', price: 35.00, discountPrice: 29.75, discountPct: 15, rating: 4.8, reviewCount: 123, soldCount: 1150, categoryName: 'Dog Food' },
    { id: 'na2', name: 'Pate cho chó mèo S2PET SNACK 85g dạng lỏng', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, reviewCount: 123, soldCount: 1234, categoryName: 'Pet Treats' },
    { id: 'na3', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, reviewCount: 123, soldCount: 456, categoryName: 'Toys' },
    { id: 'na4', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, reviewCount: 123, soldCount: 456, categoryName: 'Toys' },
    { id: 'na5', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, reviewCount: 123, soldCount: 456, categoryName: 'Toys' },
    { id: 'na6', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, reviewCount: 123, soldCount: 456, categoryName: 'Toys' },
    { id: 'na7', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, categoryName: 'Toys' },
    { id: 'na8', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, categoryName: 'Toys' },
    { id: 'na9', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, categoryName: 'Toys' },
    { id: 'na10', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8, categoryName: 'Toys' }
  ];

  dogProducts: ProductBriefModel[] = [
    { id: 'dp1', name: 'Beef & Rice Kibble', coverImage: 'assets/images/asset_2.png', price: 42.00, discountPrice: 35.70, discountPct: 15, rating: 4.9, categoryName: 'Dog Food' },
    { id: 'dp2', name: 'Indestructible Chew Ball', coverImage: 'assets/images/asset_3.png', price: 12.99, rating: 4.6, categoryName: 'Toys' },
    { id: 'dp3', name: 'Beef & Rice Kibble', coverImage: 'assets/images/asset_2.png', price: 42.00, discountPrice: 35.70, discountPct: 15, rating: 4.9, categoryName: 'Dog Food' },
    { id: 'dp4', name: 'Indestructible Chew Ball', coverImage: 'assets/images/asset_3.png', price: 12.99, rating: 4.6, categoryName: 'Toys' },
    { id: 'dp5', name: 'Beef & Rice Kibble', coverImage: 'assets/images/asset_2.png', price: 42.00, discountPrice: 35.70, discountPct: 15, rating: 4.9, categoryName: 'Dog Food' },
    { id: 'dp6', name: 'Indestructible Chew Ball', coverImage: 'assets/images/asset_3.png', price: 12.99, rating: 4.6, categoryName: 'Toys' },
    { id: 'dp7', name: 'Beef & Rice Kibble', coverImage: 'assets/images/asset_2.png', price: 42.00, discountPrice: 35.70, discountPct: 15, rating: 4.9, categoryName: 'Dog Food' },
    { id: 'dp8', name: 'Indestructible Chew Ball', coverImage: 'assets/images/asset_3.png', price: 12.99, rating: 4.6, categoryName: 'Toys' },
    { id: 'dp9', name: 'Beef & Rice Kibble', coverImage: 'assets/images/asset_2.png', price: 42.00, discountPrice: 35.70, discountPct: 15, rating: 4.9, categoryName: 'Dog Food' },
    { id: 'dp10', name: 'Indestructible Chew Ball', coverImage: 'assets/images/asset_3.png', price: 12.99, rating: 4.6, categoryName: 'Toys' }
  ];

  catProducts: ProductBriefModel[] = [
    { id: 'cp1', name: 'Cat Dental Treats Bag', coverImage: 'assets/images/asset_2.png', price: 11.99, discountPrice: 9.99, discountPct: 15, rating: 4.8, categoryName: 'Cat Treats' },
    { id: 'cp2', name: 'Modern Pine Tower', coverImage: 'assets/images/asset_1.png', price: 89.00, rating: 4.7, categoryName: 'Furniture' },
    { id: 'cp3', name: 'Cat Dental Treats Bag', coverImage: 'assets/images/asset_2.png', price: 11.99, discountPrice: 9.99, discountPct: 15, rating: 4.8 },
    { id: 'cp4', name: 'Modern Pine Tower', coverImage: 'assets/images/asset_1.png', price: 89.00, rating: 4.7 },
    { id: 'cp5', name: 'Cat Dental Treats Bag', coverImage: 'assets/images/asset_2.png', price: 11.99, discountPrice: 9.99, discountPct: 15, rating: 4.8 },
    { id: 'cp6', name: 'Modern Pine Tower', coverImage: 'assets/images/asset_1.png', price: 89.00, rating: 4.7 },
    { id: 'cp7', name: 'Cat Dental Treats Bag', coverImage: 'assets/images/asset_2.png', price: 11.99, discountPrice: 9.99, discountPct: 15, rating: 4.8 },
    { id: 'cp8', name: 'Modern Pine Tower', coverImage: 'assets/images/asset_1.png', price: 89.00, rating: 4.7 },
    { id: 'cp9', name: 'Cat Dental Treats Bag', coverImage: 'assets/images/asset_2.png', price: 11.99, discountPrice: 9.99, discountPct: 15, rating: 4.8 },
    { id: 'cp10', name: 'Modern Pine Tower', coverImage: 'assets/images/asset_1.png', price: 89.00, rating: 4.7 }
  ];

  news: NewsBriefModel[] = [
    { id: 'n1', title: 'Top 5 tips for summer pet hydration', summary: 'As temperatures rise, keeping your furry friends cool is more important than ever...', thumbnailImage: 'assets/images/asset_1.png' },
    { id: 'n2', title: 'New social distancing rules for dog parks', summary: 'The local community has updated guidelines for our favourite play areas...', thumbnailImage: 'assets/images/asset_2.png' },
    { id: 'n3', title: 'New social distancing rules for dog parks', summary: 'The local community has updated guidelines for our favourite play areas...', thumbnailImage: 'assets/images/asset_2.png' },
    { id: 'n4', title: 'New social distancing rules for dog parks', summary: 'The local community has updated guidelines for our favourite play areas...', thumbnailImage: 'assets/images/asset_2.png' },
    { id: 'n5', title: 'New social distancing rules for dog parks', summary: 'The local community has updated guidelines for our favourite play areas...', thumbnailImage: 'assets/images/asset_2.png' }
  ];

  constructor() {
    super();
  }

  // --- Child event handlers ---
  // onBannerTap(banner: BannerDTO): void {
  //   console.log('[Home] Banner tapped:', banner.id);
  // }

  onCategorySelect(category: QuickCategoryModel): void {
    this.activeId = category.id;
  }

  onSeeAll(sectionTitle: string): void {
    console.log('[Home] See all clicked for:', sectionTitle);
  }

  onProductClick(product: ProductBriefModel): void {
    console.log('[Home] Product clicked:', product.id);
    this.navigate('/product-details');
  }

  onAddToCart(product: ProductBriefModel): void {
    console.log('[Home] Add to cart:', product.id);
  }

  onPromoExplore(theme: string): void {
    console.log('[Home] Promo explore:', theme);
  }

  onNewsArticleClick(article: NewsBriefModel): void {
    console.log('[Home] Article clicked:', article.id);
  }

  // onScrollToTop(): void {
  //   this.content.scrollToTop(400);
  //   this.showFab = false;
  // }
}
