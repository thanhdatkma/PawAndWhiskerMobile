import { Injectable } from '@angular/core';
import mockData from '../../../test/mock-data.json';
import { ProductBriefModel } from '../models/product-brief.model';
import { ProductDetailModel } from '../models/product-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts = (): ProductBriefModel[] => mockData.products as any[];
  getNewArrivals = (): ProductBriefModel[] => mockData.new_arrivals as any[];
  getDogProducts = (): ProductBriefModel[] => mockData.dog_products as any[];
  getCatProducts = (): ProductBriefModel[] => mockData.cat_products as any[];
  getProductDetail = (id: string): ProductDetailModel => mockData.product_detail as any;
  getFilterState = () => mockData.filter_state;
}
