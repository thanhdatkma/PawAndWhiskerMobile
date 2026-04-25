import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, IonGrid, IonRow, 
  IonCol, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
  IonIcon, IonButton, IonBadge, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { atOutline, saveOutline, optionsOutline, swapVerticalOutline, chevronDownOutline, pricetagOutline, bookmarkOutline } from 'ionicons/icons';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { takeUntil, take } from 'rxjs/operators';

import { ModalController } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FilterSortComponent } from '../filter-sort/filter-sort.component';
import { FilterTab, SortType, SORT_OPTIONS_MAP } from '../../enums/filter.enum';
import { SortLabelPipe } from '../../pipes/sort-label.pipe';
import { ProductActions } from '../../state/product/product.actions';
import { 
  selectProductList, 
  selectProductListLoading, 
  selectProductListHasMore, 
  selectProductListCurrentPage 
} from '../../state/product/product.selectors';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-product-of-category',
  templateUrl: './product-of-category.component.html',
  styleUrls: ['./product-of-category.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonGrid, IonRow, 
    IonCol, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
    IonIcon, IonButton, IonBadge, IonRefresher, IonRefresherContent,
    AppHeaderComponent, ProductCardComponent, FilterSortComponent,
    SortLabelPipe
  ]
})
export class ProductOfCategoryComponent extends BaseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private modalCtrl = inject(ModalController);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  
  categoryId = this.route.snapshot.paramMap.get('id');
  categoryName: string = 'Products';
  showSearch = false;
  isFilterHidden = false;
  
  products$ = this.store.select(selectProductList);
  isLoading$ = this.store.select(selectProductListLoading);
  hasMore$ = this.store.select(selectProductListHasMore);
  currentPage$ = this.store.select(selectProductListCurrentPage);

  products: ProductBriefModel[] = [];
  originalProducts: ProductBriefModel[] = [];

  private searchSubject = new Subject<string>();
  filterState: any = {
    page: 1,
    perPage: 10,
    searchTerm: '',
    categoryIds: this.categoryId ? [this.categoryId] : [],
    brandIds: [],
    attributeIds: [],
    minPrice: 0,
    maxPrice: 0,
    orderBy: 'name',
    orderDir: 'asc',
  };

  readonly FilterTab = FilterTab;
  readonly SortType = SortType;

  constructor() {
    super();
    addIcons({optionsOutline, swapVerticalOutline, chevronDownOutline, pricetagOutline, bookmarkOutline, atOutline, saveOutline});
    
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe(searchTerm => {
      this.store.dispatch(ProductActions.loadProductsByCategory({ 
        categoryIds: this.categoryId, 
        page: 1,
        perPage: this.filterState.perPage,
        searchTerm: searchTerm
      }));
    });
  }
  override ngOnInit() {
    super.ngOnInit();
    this.filterState = {
      ...this.categoryService.getFilterState(),
      selectedSort: { 
        value: SortType.DEFAULT, 
        label: SORT_OPTIONS_MAP.get(SortType.DEFAULT)! 
      }
    };

    this.categoryId = this.route.snapshot.paramMap.get('id');
    
    if (this.categoryId) {
      this.store.dispatch(ProductActions.loadProductsByCategory({ 
        categoryIds: this.categoryId ? [this.categoryId] : [], 
        page: this.filterState.page,
        perPage: this.filterState.perPage,
        searchTerm: this.filterState.searchTerm
      }));
    }
    
    this.configService.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(settings => {
        if (settings?.searchBarTabs) {
          this.showSearch = settings.searchBarTabs.includes('categories');
        }
      });

    this.scrollService.filterHidden$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(isHidden => {
        this.isFilterHidden = isHidden;
      });

    this.products$.pipe(takeUntil(this.destroyed$)).subscribe(products => {
      this.products = products;
      this.originalProducts = products;
    });
  }

  onScroll(event: any) {
    this.handleScroll(event);
  }

  override handleRefresh(event: any) {
    this.filterState.page = 1;
    this.store.dispatch(ProductActions.loadProductsByCategory({ 
      categoryIds: this.categoryId ? [this.categoryId] : [], 
      page: 1,
      perPage: this.filterState.perPage,
      searchTerm: this.filterState.searchTerm
    }));
    
    this.isLoading$.pipe(
      takeUntil(this.destroyed$),
      distinctUntilChanged()
    ).subscribe(loading => {
      if (!loading) {
        event.target.complete();
      }
    });
  }

  loadData(event: any) {
    this.currentPage$.pipe(take(1)).subscribe(page => {
      this.store.dispatch(ProductActions.loadProductsByCategory({ 
        categoryIds: this.categoryId ? [this.categoryId] : [],
        page: page + 1,
        perPage: this.filterState.perPage,
        searchTerm: this.filterState.searchTerm 
      }));
      
      this.isLoading$.pipe(
        takeUntil(this.destroyed$),
        distinctUntilChanged()
      ).subscribe(loading => {
        if (!loading) {
          event.target.complete();
        }
      });
    });
  }

  onSearchChange(value: any) {
    const term = typeof value === 'string' ? value : value.target?.value;
    this.searchSubject.next(term);
  }

  viewProduct(id: string) {
    this.navigate('/product-details', { id });
  }

  async openFilterSort(tab: FilterTab = FilterTab.BRANDS) {
    const modal = await this.modalCtrl.create({
      component: FilterSortComponent,
      componentProps: {
        initialTab: tab,
        filterState: JSON.parse(JSON.stringify(this.filterState))
      },
      cssClass: 'auto-height-modal sheet-modal',
      backdropDismiss: true,
      breakpoints: [0, 1, 1],
      initialBreakpoint: 1,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.filterState) {
      this.filterState = data.filterState;
      this.applyFilters();
    }
  }

  applyFilters() {
    const sortValue = typeof this.filterState.selectedSort === 'object' 
      ? this.filterState.selectedSort.value 
      : this.filterState.selectedSort;

    this.store.dispatch(ProductActions.loadProductsByCategory({
      categoryIds: this.categoryId ? [this.categoryId] : [],
      page: 1,
      perPage: this.filterState.perPage,
      searchTerm: this.filterState.searchTerm,
      sortBy: (sortValue === SortType.PRICE_ASC || sortValue === SortType.PRICE_DESC) ? 'price' : 'name',
      sortDirection: (sortValue === SortType.PRICE_DESC || sortValue === SortType.BRAND_DESC) ? 'desc' : 'asc'
    }));
  }

  getFilterCount(type: FilterTab): number {
    if (type === FilterTab.SORT) return 0;
    const key = type === FilterTab.PRICING ? 'pricings' : type;
    return (this.filterState as any)[key].filter((item: any) => item.checked).length;
  }
}
