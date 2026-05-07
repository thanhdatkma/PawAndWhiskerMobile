import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { BannerSliderComponent } from '../../shared/components/banner-slider/banner-slider.component';
import { QuickCategoryGridComponent } from '../../shared/components/quick-category-grid/quick-category-grid.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { NewsBriefModel } from '../../models/news-brief.model';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { ProductSectionComponent } from '../../shared/components/product-section/product-section.component';
import { PromoBannerComponent } from '../../shared/components/promo-banner/promo-banner.component';
import { NewsFeedComponent } from '../../shared/components/news-feed/news-feed.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectNewArrivals, selectNewsFeed, selectNewsHasMore, selectNewsLoadingMore, ProductActions, HomeActions, CategoryActions, selectAllCategories, selectProductSlider, selectNewComments, selectDealOfDay, selectFlashSale, selectPopupBanner } from '../../store';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonRefresher, IonRefresherContent,
    BannerSliderComponent, QuickCategoryGridComponent,
    ProductSectionComponent, PromoBannerComponent, NewsFeedComponent,
    AsyncPipe, NgIf
  ],
})
export class HomePageComponent extends BaseComponent implements OnInit {

  private productService = inject(ProductService);

  activeId = 'clothing';

  banners$ = this.store.select(selectProductSlider);
  categories$ = this.store.select(selectAllCategories);
  newArrivals$ = this.store.select(selectNewArrivals);
  dealOfDay$ = this.store.select(selectDealOfDay);
  productComment$ = this.store.select(selectNewComments);
  productFlashSale$ = this.store.select(selectFlashSale);
  news$ = this.store.select(selectNewsFeed);
  popupBanner$ = this.store.select(selectPopupBanner);
  newsHasMore$ = this.store.select(selectNewsHasMore);
  newsLoadingMore$ = this.store.select(selectNewsLoadingMore);

  isPopupOpen = false;

  constructor() {
    super();
  }

  override ngOnInit() {
    this.loadData();
    this.popupBanner$.subscribe(banner => {
      if (banner && !this.productService.isPopupDismissed()) {
        this.isPopupOpen = true;
      }
    });
  }

  loadData() {
    this.productService.resetPopupSession();
    this.store.dispatch(ProductActions.loadSliderImages());
    this.store.dispatch(CategoryActions.loadCategories({ isQuick: true }));
    this.store.dispatch(ProductActions.loadProductsNewArrivals());
    this.store.dispatch(ProductActions.loadProductsDealOfDay());
    this.store.dispatch(ProductActions.loadProductsComment());
    this.store.dispatch(ProductActions.loadProductsFlashSale());
    this.store.dispatch(ProductActions.loadProductsByCategory({ categoryIds: [this.activeId] }));
    this.store.dispatch(HomeActions.loadNewsFeed());
    this.store.dispatch(ProductActions.loadPopupBanner());
  }

  override handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  onCategorySelect(category: any): void {
    this.activeId = category.id;
    this.store.dispatch(ProductActions.loadProductsNewArrivals());
    this.store.dispatch(ProductActions.loadProductsDealOfDay());
    this.store.dispatch(ProductActions.loadProductsByCategory({ categoryIds: [this.activeId] }));
  }

  onSeeAll(sectionTitle: string): void {
    const sectionMap: Record<string, string> = {
      'New Arrivals': 'new-arrivals',
      'Deal of the Day': 'deal-of-day',
      'Top Comments': 'top-comments',
      'Flash Sale': 'flash-sale'
    };

    const sectionKey = sectionMap[sectionTitle];
    if (!sectionKey) {
      return;
    }

    this.navigate('/category-detail', {
      queryParams: {
        section: sectionKey,
        title: sectionTitle
      }
    });
  }

  onProductClick(product: ProductBriefModel): void {
    this.navigate('/product-details/' + product.id);
  }

  onAddToCart(product: ProductBriefModel): void {
    console.log('[Home] Add to cart:', product.id);
  }

  onPromoExplore(theme: string): void {
    console.log('[Home] Promo explore:', theme);
  }

  onNewsArticleClick(article: NewsBriefModel): void {
    this.navigate('/news/' + article.id);
  }

  onNewsLoadMore(): void {
    this.store.dispatch(HomeActions.loadMoreNewsFeed());
  }

  onDismissPopup(): void {
    this.productService.dismissPopup();
    this.isPopupOpen = false;
  }

  onPopupAction(link: string): void {
    this.onDismissPopup();
    this.navigate(link);
  }
}
