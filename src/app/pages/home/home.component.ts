import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
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
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { HomeService } from '../../services/home.service';

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
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private homeService = inject(HomeService);

  activeId = 'dog';
  categories: QuickCategoryModel[] = this.categoryService.getQuickCategories();
  newArrivals: ProductBriefModel[] = this.productService.getNewArrivals();
  dogProducts: ProductBriefModel[] = this.productService.getDogProducts();
  catProducts: ProductBriefModel[] = this.productService.getCatProducts();
  news: NewsBriefModel[] = this.homeService.getNewsFeed();

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
    this.navigate('/product-details/' + product.id);
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
