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
import { AsyncPipe } from '@angular/common';
import { selectNewArrivals, selectNewsFeed, ProductActions, HomeActions, CategoryActions, selectAllCategories, selectProductSlider, selectDogFood, selectCatFood } from '../../store';


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
    AsyncPipe
  ],
})
export class HomePageComponent extends BaseComponent implements OnInit {

  activeId = 'dog';
  
  // Observables from Store
  banners$ = this.store.select(selectProductSlider);
  categories$ = this.store.select(selectAllCategories);
  newArrivals$ = this.store.select(selectNewArrivals);
  dogProducts$ = this.store.select(selectDogFood);
  catProducts$ = this.store.select(selectCatFood);
  news$ = this.store.select(selectNewsFeed);

  constructor() {
    super();
  }

  override ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.store.dispatch(ProductActions.loadSliderImages());
    this.store.dispatch(CategoryActions.loadCategories({isQuick: true}));
    this.store.dispatch(ProductActions.loadProductsNewArrivals());
    this.store.dispatch(ProductActions.loadProductsDogFood());
    this.store.dispatch(ProductActions.loadProductsCatFood());
    // this.store.dispatch(ProductActions.loadProductsDealOfDay());
    // this.store.dispatch(ProductActions.loadProductsComment());
    this.store.dispatch(HomeActions.loadNewsFeed());

    // this.store.dispatch(ProductActions.loadPopupBanner());
  }

  override handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // --- Child event handlers ---
  onCategorySelect(category: any): void {
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
}
