import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CategoryModel } from '../../models/categories.model';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Load Categories': props<{parentId?: string, isQuick?: boolean}>(),
    'Load Categories Success': props<{ categories: CategoryModel[] }>(),
    'Load Categories Failure': props<{ error: string }>(),
    'Select Parent Category': props<{ id: string }>(),
  }
});
