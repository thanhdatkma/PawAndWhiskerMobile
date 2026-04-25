import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/categories.model';
import { BaseService } from './base.service';
import { PaginationModel } from '../models/pagination.model';
import { ProductBriefModel } from '../models/product-brief.model';
import { SearchParamsModel } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  getCategories(params: {parentId?: string, isQuick?: boolean} = {}): Observable<CategoryModel[]> {
    return this.get<CategoryModel[]>(`api/products/categories`, params);
  }

  getProductByCategories(params: SearchParamsModel): Observable<PaginationModel<ProductBriefModel>> {
    return this.get<PaginationModel<ProductBriefModel>>(`api/products/categories/search`, params);
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
}
