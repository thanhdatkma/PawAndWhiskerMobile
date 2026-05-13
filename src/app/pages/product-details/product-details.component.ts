import { Component, OnInit, HostBinding, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heartOutline, star, chevronForwardOutline, busOutline, refreshOutline, leafOutline, ribbonOutline, paw, removeOutline, addOutline, cartOutline, heart, shareOutline } from 'ionicons/icons';
import { ProductDescriptionTabModel, ProductDetailModel } from '../../models/product-detail.model';
import { BreadcrumbModel } from '../../models/breadcrumb.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductBriefModel } from '../../models/product-brief.model';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { FavoriteService } from '../../services/favorite.service';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { ProductActions, selectProductDetail } from 'src/app/store';
import { CurrencyPipe } from '../../pipes/currency-pipe';
import { finalize, takeUntil } from 'rxjs';
import { ProductService } from '../../services/product.service';

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
  descriptionTabs: ProductDescriptionTabModel[] = [];
  productImages: string[] = [];
  recommendedProducts: ProductBriefModel[] = [];
  recommendedPage = 1;
  recommendedPerPage = 10;
  recommendedHasNext = false;
  recommendedLoading = false;
  private recommendedSourceProductId: number | null = null;
  productDetail: ProductDetailModel | undefined;
  keyBenefitsTitle = '';
  keyBenefitsItems: string[] = [];
  qualityAssuranceTitle = '';
  qualityAssuranceItems: string[] = [];
  productDetail$ = this.store.select(selectProductDetail);
  private route = inject(ActivatedRoute);

  constructor(
    private favoriteService: FavoriteService,
    private productService: ProductService
  ) {
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

    const id = this.route.snapshot.paramMap.get('id') ?? this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.store.dispatch(ProductActions.loadProductDetail({ productId: id }));
    }

    this.productDetail$.pipe(takeUntil(this.destroyed$)).subscribe(product => {
      if (!product) return;
      this.productDetail = this.normalizeProductDetail(product as ProductDetailModel);
      this.productImages = this.normalizeImageUrls((this.productDetail as any)?.images);
      this.descriptionTabs = Array.isArray((this.productDetail as any)?.description_tabs)
        ? ((this.productDetail as any).description_tabs as ProductDescriptionTabModel[])
        : [];
      this.applyBenefitsSections(this.productDetail as ProductDetailModel);
      if (this.productDetail?.id && this.productDetail.id !== this.recommendedSourceProductId) {
        this.recommendedSourceProductId = this.productDetail.id;
        this.loadInitialRecommendations();
      }
      if (this.descriptionTabs.length > 0 && !this.descriptionTabs.some((tab) => tab.key === this.activeTab)) {
        this.activeTab = this.descriptionTabs[0].key;
      }
      
      if (this.productDetail?.weights && this.productDetail?.weights.length > 0 && !this.selectedWeight) {
        this.selectedWeight = this.productDetail?.weights[0];
      }
      this.checkFavorite();
    });

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
    if (!this.recommendedSourceProductId || this.recommendedLoading) return;
    this.recommendedPage = 1;
    this.recommendedProducts = [];
    this.fetchRecommendedProducts(this.recommendedPage, true);
  }

  loadMoreProducts(event: any) {
    if (!this.recommendedHasNext || this.recommendedLoading) {
      if (event?.target) {
        event.target.complete();
        event.target.disabled = !this.recommendedHasNext;
      }
      return;
    }
    this.fetchRecommendedProducts(this.recommendedPage + 1, false, event);
  }

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

  private normalizeProductDetail(product: any): ProductDetailModel {
    const pricing = product?.pricing ?? {};
    const metadata = product?.metadata ?? {};
    const ratingSummary = product?.rating_summary ?? {};
    const images = this.normalizeImageUrls(product?.images);

    const breadcrumbsInput = product?.breadcrumb ?? product?.breadcrumbs ?? [];
    const breadcrumbs: BreadcrumbModel[] = Array.isArray(breadcrumbsInput)
      ? breadcrumbsInput.map((crumb: any) => ({
          id: crumb?.id ?? crumb?.Id,
          label: crumb?.label ?? crumb?.name ?? '',
          name: crumb?.name ?? '',
          Id: crumb?.Id ?? 0,
          slug: crumb?.slug ?? '',
          url: crumb?.url,
          isActive: !!crumb?.isActive,
        }))
      : [];

    const weightOptions = product?.options?.weight ?? product?.weights ?? [];
    const weights = Array.isArray(weightOptions)
      ? weightOptions.map((w: unknown) => String(w))
      : [];

    const regularPrice = this.toNumber(pricing?.regular_price ?? product?.regular_price);
    const salePrice = this.toNumber(pricing?.sale_price ?? product?.sale_price);
    const currentPrice = this.toNumber(pricing?.current_price ?? product?.current_price);

    return {
      ...product,
      images,
      mainImage: images[0] ?? '',
      breadcrumb: breadcrumbs,
      breadcrumbs,
      weights,
      regular_price: regularPrice,
      sale_price: salePrice,
      current_price: currentPrice ?? salePrice ?? regularPrice,
      discountPct: this.toNumber(pricing?.discount ?? product?.discount ?? product?.discountPct),
      sold_count: this.toNumber(metadata?.sold_count ?? product?.sold_count),
      rating: this.toNumber(ratingSummary?.average ?? product?.rating) ?? 0,
      rating_count: this.toNumber(ratingSummary?.rating_count ?? product?.rating_count),
      reviewCount: this.toNumber(ratingSummary?.review_count ?? product?.reviewCount),
      description_tabs: this.normalizeDescriptionTabs(product),
    };
  }

  get activeDescriptionContent(): string {
    if (!this.descriptionTabs.length) {
      return this.productDetail?.description ?? '';
    }
    return this.descriptionTabs.find((tab) => tab.key === this.activeTab)?.content ?? '';
  }

  private normalizeImageUrls(imagesInput: any): string[] {
    if (!imagesInput) return [];

    if (Array.isArray(imagesInput)) {
      return imagesInput
        .map((img: any) => (typeof img === 'string' ? img : img?.src ?? img?.url ?? ''))
        .filter((img: string) => !!img);
    }

    if (typeof imagesInput === 'object') {
      const cover = imagesInput?.cover;
      const gallery = imagesInput?.gallery;
      const coverUrl = typeof cover === 'string' ? cover : cover?.src ?? cover?.url ?? '';
      const galleryUrls = Array.isArray(gallery)
        ? gallery
            .map((img: any) => (typeof img === 'string' ? img : img?.src ?? img?.url ?? ''))
            .filter((img: string) => !!img)
        : [];
      return [coverUrl, ...galleryUrls].filter((img) => !!img);
    }

    return [];
  }

  private toNumber(value: unknown): number | undefined {
    if (value === null || value === undefined || value === '') return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  private normalizeDescriptionTabs(product: any): ProductDescriptionTabModel[] {
    const rawTabs = product?.description_tabs;
    if (!Array.isArray(rawTabs) || rawTabs.length === 0) {
      return [
        {
          key: 'info',
          title: 'Product Information',
          content: product?.description ?? '',
        },
        {
          key: 'ingredients',
          title: 'Ingredients',
          content: '',
        },
        {
          key: 'guide',
          title: 'Feeding Guide',
          content: '',
        },
      ];
    }

    return rawTabs
      .map((tab: any, index: number) => ({
        key: String(tab?.key ?? `tab-${index}`),
        title: String(tab?.title ?? ''),
        content: String(tab?.content ?? ''),
      }))
      .filter((tab: ProductDescriptionTabModel) => tab.key && tab.title);
  }

  private applyBenefitsSections(product: ProductDetailModel): void {
    const sections = (product as any)?.benefits_sections ?? {};
    const keyBenefits = sections?.key_benefits ?? {};
    const qualityAssurance = sections?.quality_assurance ?? {};

    this.keyBenefitsTitle = this.getSectionTitle(keyBenefits?.title_meta);
    this.keyBenefitsItems = this.getSectionItems(keyBenefits?.content_meta);

    this.qualityAssuranceTitle = this.getSectionTitle(qualityAssurance?.title_meta);
    this.qualityAssuranceItems = this.getSectionItems(qualityAssurance?.content_meta);
  }

  private getSectionTitle(value: unknown): string {
    if (typeof value !== 'string') return '';
    const trimmed = value.trim();
    return trimmed;
  }

  private getSectionItems(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    const normalized = value
      .map((item: unknown) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item: string) => !!item);
    return normalized;
  }

  private fetchRecommendedProducts(page: number, reset = false, event?: any): void {
    if (!this.recommendedSourceProductId) {
      if (event?.target) event.target.complete();
      return;
    }

    this.recommendedLoading = true;
    this.productService
      .getRelatedProducts(this.recommendedSourceProductId, page, this.recommendedPerPage)
      .pipe(
        finalize(() => {
          this.recommendedLoading = false;
          if (event?.target) {
            event.target.complete();
            event.target.disabled = !this.recommendedHasNext;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (response) => {
          const items = Array.isArray(response?.items) ? response.items : [];
          this.recommendedProducts = reset ? items : [...this.recommendedProducts, ...items];
          this.recommendedPage = response?.pageIndex ?? page;
          this.recommendedHasNext = !!response?.hasNextPage;
        },
        error: () => {
          if (reset) {
            this.recommendedProducts = [];
          }
          this.recommendedHasNext = false;
        },
      });
  }
}
