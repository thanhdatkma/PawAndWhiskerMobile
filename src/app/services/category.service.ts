import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../models/categories.model';
import { BaseService } from './base.service';
import { PaginationModel } from '../models/pagination.model';
import { ProductBriefModel } from '../models/product-brief.model';
import { SearchParamsModel } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  getCategories(params: { parentId?: string, isQuick?: boolean, includeChildren?: boolean } = {}): Observable<CategoryModel[]> {
    const apiParams = {
      parent_id: params.parentId,
      is_quick: params.isQuick,
      include_children: params.includeChildren
    };

    return this.get<any[]>(`wooconnector/v1/products/categories`, apiParams).pipe(
      map((categories) => (Array.isArray(categories) ? categories : []).map((item) => this.mapCategory(item)))
    );
  }

  getProductByCategories(params: SearchParamsModel): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`wooconnector/v1/categoriessearch`, params);
  }

  getFilterState() {
    return {
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
      ]
    };
  }

  private mapCategory(item: any): CategoryModel {
    return {
      id: String(item?.id ?? ''),
      name: item?.name ?? '',
      iconName: item?.iconName || item?.icon_name || 'category',
      itemCount: Number(item?.itemCount ?? item?.item_count ?? item?.count ?? 0),
      image: item?.image || item?.icon_url || '',
      children: Array.isArray(item?.children) ? item.children.map((child: any) => this.mapCategory(child)) : [],
      isQuick: Boolean(item?.isQuick ?? item?.is_quick),
      sequence: Number(item?.sequence ?? item?.sort_order ?? 0)
    };
  }
}
