import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, IonGrid, IonRow, 
  IonCol, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
  IonIcon, IonButton, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { atOutline, saveOutline, optionsOutline, swapVerticalOutline, chevronDownOutline, pricetagOutline, bookmarkOutline } from 'ionicons/icons';
import { BaseComponent } from '../../shared/base-component/base.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { ConfigService } from '../../services/config.service';
import { ProductService } from '../../services/product.service';
import { takeUntil } from 'rxjs/operators';

import { ModalController } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { FilterSortComponent } from '../filter-sort/filter-sort.component';
import { FilterTab, SortType, SORT_OPTIONS_MAP } from '../../enums/filter.enum';
import { SortLabelPipe } from '../../pipes/sort-label.pipe';



@Component({
  selector: 'app-product-of-category',
  templateUrl: './product-of-category.component.html',
  styleUrls: ['./product-of-category.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonGrid, IonRow, 
    IonCol, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
    IonIcon, IonButton, IonBadge,
    AppHeaderComponent, ProductCardComponent, FilterSortComponent,
    SortLabelPipe
  ]
})
export class ProductOfCategoryComponent extends BaseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private modalCtrl = inject(ModalController);
  private productService = inject(ProductService);
  
  categoryId: string | null = null;
  categoryName: string = 'Products';
  showSearch = false;
  isFilterHidden = false;
  
  products: ProductBriefModel[] = [];
  originalProducts: ProductBriefModel[] = [];

  filterState: any = {};

  readonly FilterTab = FilterTab;
  readonly SortType = SortType;

  constructor() {
    super();
    addIcons({optionsOutline, swapVerticalOutline, chevronDownOutline, pricetagOutline, bookmarkOutline, atOutline, saveOutline});
  }

  override ngOnInit() {
    super.ngOnInit();
    this.products = this.productService.getProducts();
    this.originalProducts = [...this.products];
    this.filterState = {
      ...this.productService.getFilterState(),
      selectedSort: { 
        value: SortType.DEFAULT, 
        label: SORT_OPTIONS_MAP.get(SortType.DEFAULT)! 
      }
    };
    
    this.categoryId = this.route.snapshot.paramMap.get('id');
    
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
  }

  onScroll(event: any) {
    this.handleScroll(event);
  }

  loadData(event: any) {
    setTimeout(() => {
      const nextBatch = this.products.slice(0, 6).map(p => ({...p, id: Math.random().toString()}));
      this.products.push(...nextBatch);
      event.target.complete();

      if (this.products.length > 30) {
        event.target.disabled = true;
      }
    }, 1000);
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
    let filtered = [...this.originalProducts];
    
    // active filters
    const activeBrands = this.filterState.brands.filter((b: any) => b.checked).map((b: any) => b.label);
    const activePricing = this.filterState.pricings.filter((p: any) => p.checked).map((p: any) => p.label);
    
    // Simulate filtering
    if (activePricing.length > 0) {
      filtered = filtered.filter(p => {
        const price = p.discountPrice || p.price;
        return activePricing.some((range: string) => {
          if (range === '$0 - $31' && price <= 31) return true;
          if (range === '$31 - $64' && price > 31 && price <= 64) return true;
          if (range === '$64 - $121' && price > 64 && price <= 121) return true;
          return false;
        });
      });
    }

    if (activeBrands.length > 0) {
      // Because we don't have brand in ProductBriefModel, just mock it by keeping all if they are checked
      // Or actually filter by name including brand name? Let's just mock
    }

    // Sort
    const sortValue = typeof this.filterState.selectedSort === 'object' 
      ? this.filterState.selectedSort.value 
      : this.filterState.selectedSort;

    if (sortValue === SortType.PRICE_ASC) {
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortValue === SortType.PRICE_DESC) {
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortValue === SortType.BRAND_ASC) {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === SortType.BRAND_DESC) {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    this.products = filtered;
  }

  getFilterCount(type: FilterTab): number {
    if (type === FilterTab.SORT) return 0;
    const key = type === FilterTab.PRICING ? 'pricings' : type;
    return (this.filterState as any)[key].filter((item: any) => item.checked).length;
  }
}
