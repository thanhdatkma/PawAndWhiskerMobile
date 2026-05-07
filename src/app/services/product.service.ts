import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductBriefModel } from '../models/product-brief.model';
import { ProductDetailModel } from '../models/product-detail.model';
import { BaseService } from './base.service';
import { SlideModel } from '../models/slides.model';
import { PopupBannerModel } from '../models/popup-banner.model';

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
    return this.get<ProductDetailModel>(`api/products/${id}`);
  }

  getNewArrivals(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`wooconnector/v1/products/new-arrivals`);
  }

  getDealOfToday(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`wooconnector/v1/products/get-deal-of-day`);
  }

  getNewComment(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`wooconnector/v1/products/top-comment`);
  }

  getFlashSale(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`wooconnector/v1/products/flash-sale`);
  }

  getCategoryProducts(slug: string): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`wooconnector/v1/products/${slug}`);
  }

  getSlideImages(): Observable<SlideModel[]> {
    return this.get<SlideModel[]>(`mobiconnector/v1/slider`);
  }

  getPopupBanners(): Observable<PopupBannerModel[]> {
    return this.get<PopupBannerModel | null>(`mobiconnector/v1/popup`)
      .pipe(map(res => res ? [res] : []));
  }


}
