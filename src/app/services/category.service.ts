import { Injectable } from '@angular/core';
import mockData from '../../../test/mock-data.json';
import { CategoryModel } from '../models/categories.model';
import { QuickCategoryModel } from '../models/quick-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  getCategories = (): CategoryModel[] => mockData.categories as any[];
  getQuickCategories = (): QuickCategoryModel[] => mockData.quick_categories as any[];
}
