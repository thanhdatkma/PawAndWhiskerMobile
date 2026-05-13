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
      brands: [],
      pricings: [],
      tags: [],
      sortBy: []
    };
  }

  getFilterOptions(categoryId: string): Observable<{ brands: any[]; pricings: any[]; tags: any[]; sortBy: any[] }> {
    return this.get<{
      branches?: any[];
      brands?: any[];
      pricings?: any[];
      tags?: any[];
      sortBy?: any[];
    }>('wooconnector/v1/filter-options', { category_id: categoryId }).pipe(
      map((res) => ({
        brands: (res.brands ?? []).map((b) => ({ ...b, checked: Boolean(b.checked) })),
        pricings: (res.pricings ?? []).map((p) => ({ ...p, checked: Boolean(p.checked) })),
        tags: (res.tags ?? []).map((t) => ({ ...t, checked: Boolean(t.checked) })),
        sortBy: res.sortBy ?? []
      }))
    );
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
