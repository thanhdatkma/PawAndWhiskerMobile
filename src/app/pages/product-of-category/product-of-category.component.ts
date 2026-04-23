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
import { takeUntil } from 'rxjs/operators';

import { ModalController } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../shared/app-header/app-header.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { FilterSortComponent } from '../filter-sort/filter-sort.component';

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
    
  ]
})
export class ProductOfCategoryComponent extends BaseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private modalCtrl = inject(ModalController);
  
  categoryId: string | null = null;
  categoryName: string = 'Products';
  showSearch = false;
  isFilterHidden = false;
  
  products: ProductBriefModel[] = [
    {
      id: '1',
      name: 'Gourmet Chicken Kibble',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtFAKwY5nEHFkkTSaDGl2g8aMDi-8TxHPB-VY8n0KnO2iJjM7ZoST5eF9E3aB6F9YjWyzLMzhuy58ICmernXNLl8nwbvz7cFN-z1P48vPXYXC0qyMcrrLp4Bmjn1KCe1-cvZ26jlFR1ZiQIMPrahz01nhZTDWvplx3q2bBnQDXWOPYjAWgS0-bHDaiT0dkU7Fc5ich9KL2J-VpVGqyuX7fU3uqb__c1WeFaSO_boCHS0PWNVczRzfWtxot4DjHnM8XrB9m0W_Jj10',
      price: 39.99,
      discountPrice: 45.00,
      discountPct: 10,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Ocean Whale Plushie',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC48Q20nxo7kEp_Yi88vnvXYAyM5iwOS4y8M_4kWbiW0c7_5ESlj324zOxyQVywygUIi8rbySoChR962hLbDNp6LoJIa3uU_NiJYLa_dKbPCSpH4DGmioewVYcr7GXsp9Lgzzzf8W8coOQFmeQpsdF1j4kSbQLg6HERX4ZtfX_PZ_MjT1OvX9X_y7Y4trUtMF69fjzo4LfcHwJvN_XeV3aCdLl34OzJc7TY2LdZy4T1lcPN2UygK13GZES2We7xvjnw6OqvF5Kpl8E',
      price: 14.50,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Leather City Leash',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHBSp-_oxme6XuHBcbJ6ZBj7Piemfo3oEEo8MUdpmrUNFleLo0cLzVfyXsT-1lslSKCOY7hqahSqCuyKdTSkCUzeBdvTiuFgWV2b_z2pO63-fURllemMebHRZrI5BgRbLoDGkGpIGXVYP3mr74WnkMQkV6BoqFeCBkcVC85vs0IZY9wXzGWQm08VoZx0k9sZVvPp0kDD3vdluiHqXDjC97dEtPBGbNjfeSGMtm3Um3kRT-rrWqCvYcIeY_vYwSjl3ddmIFuIMZO78',
      price: 27.20,
      discountPrice: 32.00,
      discountPct: 15,
      rating: 5.0
    },
    {
      id: '4',
      name: 'Oatmeal Glow Shampoo',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5lIyCto8F4IZF4lO0pwYN7XxvkFBTcN73xyqodQ-VbxBpfu9bCtFJY6mnsoyQ2q_xQA7j_HGLqkJwPgQpgbWd6p7hKRldAm2Uz-CY17Mu_o5Oq4GGsnEGP7VuJgzO5Uj-SnU9M0lHFqDZJGgf28RCaIlS5wq0fBbJr_NcrUnn9ebAsg0KPJLWUqsSjJlKHKdOnwSfQ_cc4-2Ugucmzee7PX5yrFgO6htE49i8C-9SS7CwVLeUyU1Wy-r3Unmozc4oy5ZsLZjUdEw',
      price: 19.00,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Cloud 9 Ortho Bed',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsVozkQMcFIYQVCNJ3R_wdpsCftlQT0a_kREhTRunGN-QZN4mby7X3Q7yLvv6NWzL2N6ZValLHC2ZQf46ZqLHY4Fl8S5Wf_gNXpFXTEw3cjchrNvyAwOjtb_UvhEwTiNq7dL-TON4bODF6JOYngTJMLYYq5JyhuPqmg-mmS0NAVFytXjH6hlhGYeQuA0HzjsDMxVucD3WoqMI-bxPUzFUnOTGEFWz-6VW3QfmOt708Mm5gPj_sBqm4ZBOFeBZ01xkP42enS0-JY1A',
      price: 89.00,
      rating: 4.9
    },
    {
      id: '6',
      name: 'Nordic Sisal Tower',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUhkbXQDwL2ixsPBcFMKfaC30m_48vIr1_DdJThxBFgtgcZt2BTWcsXWnakLoCdhr9Ilamnu4ZK4q2Rh1HcKmqV6GaNavrvbSaiXXWhjVxe0ii_rfObMCzUw28ddeM1JE9QFivZEiceg8Fvk8yGIV9N9CjXaHM4KcDD03zgnyBgz1CfGXcWU0JSu-yEJnafSfnPFHn3xDDxCst6yl8SG7RgF2zPC-MlqjA2JG-9gGDIpqcnGPEwMs9dOEn1bhd2U8syBl6BiKWuFE',
      price: 114.00,
      discountPrice: 120.00,
      discountPct: 5,
      rating: 4.6
    }
  ];
  originalProducts: ProductBriefModel[] = [];

  filterState = {
    brands: [
      { label: 'Nike', count: 120, checked: false },
      { label: 'Adidas', count: 85, checked: false },
      { label: 'Puma', count: 40, checked: false },
      { label: 'Reebok', count: 25, checked: false },
      { label: 'Under Armour', count: 18, checked: false }
    ],
    pricings: [
      { label: '$0 - $31', count: 800, checked: false },
      { label: '$31 - $64', count: 8, checked: false },
      { label: '$64 - $121', count: 3, checked: false }
    ],
    tags: [
      { label: 'New', count: 4, checked: false },
      { label: 'On Sale', count: 20, checked: false },
      { label: 'In Stock', count: 3, checked: false }
    ],
    selectedSort: 'price_asc'
  };

  constructor() {
    super();
    addIcons({optionsOutline, swapVerticalOutline, chevronDownOutline, pricetagOutline, bookmarkOutline, 'tuneOutline':atOutline, 'swapVertOutline':saveOutline});
  }

  override ngOnInit() {
    super.ngOnInit();
    this.originalProducts = [...this.products];
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

  async openFilterSort(tab: 'brands' | 'pricing' | 'tags' | 'sort' = 'brands') {
    const modal = await this.modalCtrl.create({
      component: FilterSortComponent,
      componentProps: {
        initialTab: tab,
        filterState: JSON.parse(JSON.stringify(this.filterState))
      },
      cssClass: 'auto-height-modal sheet-modal'
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
    if (this.filterState.selectedSort === 'price_asc') {
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (this.filterState.selectedSort === 'price_desc') {
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (this.filterState.selectedSort === 'brand_asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.filterState.selectedSort === 'brand_desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    this.products = filtered;
  }

  getFilterCount(type: 'brands' | 'pricings' | 'tags'): number {
    return this.filterState[type].filter((item: any) => item.checked).length;
  }
}
