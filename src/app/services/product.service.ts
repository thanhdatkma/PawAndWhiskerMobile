import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductBriefModel } from '../models/product-brief.model';
import { ProductDetailModel } from '../models/product-detail.model';
import { BaseService } from './base.service';
import { SlideModel } from '../models/slides.model';
import { PopupBannerModel } from '../models/popup-banner.model';
import { PaginationModel } from '../models/pagination.model';
import { SearchParamsModel } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private _popupDismissed = false;

  isPopupDismissed(): boolean {
    return this._popupDismissed;
  }

  dismissPopup(): void {
    this._popupDismissed = true;
  }

  resetPopupSession(): void {
    this._popupDismissed = false;
  }

  getProductDetail(id: number): Observable<ProductDetailModel> {
    return this.get<ProductDetailModel>(`wooconnector/v1/products/${id}`);
  }

  getNewArrivals(params: SearchParamsModel = {}): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`wooconnector/v1/products/new-arrivals`, params);
  }

  getDealOfToday(params: SearchParamsModel = {}): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`wooconnector/v1/products/get-deal-of-day`, params);
  }

  getNewComment(params: SearchParamsModel = {}): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`wooconnector/v1/products/top-comment`, params);
  }

  getFlashSale(params: SearchParamsModel = {}): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`wooconnector/v1/products/flash-sale`, params);
  }

  getCategoryProducts(slug: string, params: SearchParamsModel = {}): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`wooconnector/v1/products/${slug}`, params);
  }

  getProductsBySection(sectionKey: string, params: SearchParamsModel = {}): Observable<PaginationModel<ProductBriefModel>> {
    switch (sectionKey) {
      case 'new-arrivals':
        return this.getNewArrivals(params);
      case 'deal-of-day':
        return this.getDealOfToday(params);
      case 'top-comments':
        return this.getNewComment(params);
      case 'flash-sale':
        return this.getFlashSale(params);
      default:
        return this.getCategoryProducts('dog', params);
    }
  }

  getSlideImages(): Observable<SlideModel[]> {
    return this.get<SlideModel[]>(`mobiconnector/v1/slider`);
  }

  getPopupBanners(): Observable<PopupBannerModel[]> {
    return this.get<PopupBannerModel | null>(`mobiconnector/v1/popup`)
      .pipe(map(res => res ? [res] : []));
  }


}
