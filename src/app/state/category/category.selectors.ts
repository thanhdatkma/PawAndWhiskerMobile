import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from '../../models/app-state.model';

export const selectCategoryState = createFeatureSelector<CategoryState>('category');

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state) => state.data
);

export const selectCategoriesLoading = createSelector(
  selectCategoryState,
  (state) => state.loading
);

export const selectCategoriesError = createSelector(
  selectCategoryState,
  (state) => state.error
);

export const selectSelectedParentId = createSelector(
  selectCategoryState,
  (state) => state.selectedParentId
);

export const selectSelectedParent = createSelector(
  selectAllCategories,
  selectSelectedParentId,
  (categories, selectedId) => categories?.find(c => c.id === selectedId) || null
);

export const selectActiveChildCategories = createSelector(
  selectSelectedParent,
  (parent) => parent?.children || []
);
