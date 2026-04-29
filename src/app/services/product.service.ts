import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductBriefModel } from '../models/product-brief.model';
import { ProductDetailModel } from '../models/product-detail.model';
import { BaseService } from './base.service';
import { SlideModel } from '../models/slides.model';
import { PopupBannerModel } from '../models/popup-banner.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

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
    return this.get<SlideModel[]>(`/admin/banners`);
  }

  getPopupBanners(): Observable<PopupBannerModel> {
    return this.get<PopupBannerModel>(`api/products/popup-banners`);
  }

}
