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

  getProductDetail(id: string): Observable<ProductDetailModel> {
    return this.get<ProductDetailModel>(`api/products/${id}`);
  }

  getNewArrivals(categoryId?: string): Observable<ProductBriefModel[]> {
    const query = categoryId ? `?categoryId=${categoryId}` : '';
    return this.get<ProductBriefModel[]>(`api/products/new-arrivals${query}`);
  }

  getDealOfToday(categoryId?: string): Observable<ProductBriefModel[]> {
    const query = categoryId ? `?categoryId=${categoryId}` : '';
    return this.get<ProductBriefModel[]>(`api/products/get-deal-of-day${query}`);
  }

  getNewComment(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`api/products/get-new-comment`);
  }

  getDogProducts(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`api/products/dog-food`);
  }

  getCatProducts(): Observable<ProductBriefModel[]> {
    return this.get<ProductBriefModel[]>(`api/products/cat-food`);
  }

  getSlideImages(): Observable<SlideModel[]> {
    return this.get<{ banners: SlideModel[] }>(`store/banners`, { type: 'slider' })
      .pipe(map(res => res.banners ?? []));
  }

  getPopupBanners(): Observable<PopupBannerModel[]> {
    return this.get<{ banners: PopupBannerModel[] }>(`store/banners`, { type: 'popup' })
      .pipe(map(res => res.banners ?? []));
  }

}
