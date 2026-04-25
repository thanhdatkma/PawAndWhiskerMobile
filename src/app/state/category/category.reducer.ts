import { createReducer, on } from '@ngrx/store';
import { CategoryActions } from './category.actions';
import { createInitialApiState } from '../../models/api-state.model';
import { CategoryModel } from '../../models/categories.model';
import { CategoryState } from '../../models/app-state.model';

export const initialState: CategoryState = {
  ...createInitialApiState<CategoryModel[]>([]),
  selectedParentId: null
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    data: categories,
    loading: false,
    selectedParentId: state.selectedParentId || (categories.length > 0 ? categories[0].id : null)
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CategoryActions.selectParentCategory, (state, { id }) => ({
    ...state,
    selectedParentId: id
  }))
);
