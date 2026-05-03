import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductBriefModel } from '../../models/product-brief.model';
import { ProductDetailModel } from '../../models/product-detail.model';
import { CategoryModel } from '../../models/categories.model';
import { SearchParamsModel } from '../../models/search-params.model';
import { PaginationModel } from '../../models/pagination.model';
import { SlideModel } from '../../models/slides.model';
import { PopupBannerModel } from '../../models/popup-banner.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products New Arrivals': props<{ categoryId?: string }>(),
    'Load Products New Arrivals Success': props<{ products: ProductBriefModel[] }>(),
    'Load Products New Arrivals Failure': props<{ error: string }>(),

    'Load Products Deal of Day': props<{ categoryId?: string }>(),
    'Load Products Deal of Day Success': props<{ products: ProductBriefModel[] }>(),
    'Load Products Deal of Day Failure': props<{ error: string }>(),

    'Load Products Comment': emptyProps(),
    'Load Products Comment Success': props<{ products: ProductBriefModel[] }>(),
    'Load Products Comment Failure': props<{ error: string }>(),

    'Load Products Dog Food': emptyProps(),
    'Load Products Dog Food Success': props<{ products: ProductBriefModel[] }>(),
    'Load Products Dog Food Failure': props<{ error: string }>(),
    'Load Products Cat Food': emptyProps(),
    'Load Products Cat Food Success': props<{ products: ProductBriefModel[] }>(),
    'Load Products Cat Food Failure': props<{ error: string }>(),

    'Load Products By Category': props<SearchParamsModel>(),
    'Load Products By Category Success': props<PaginationModel<ProductBriefModel>>(),
    'Load Products By Category Failure': props<{ error: string }>(),
    'Reset Product List': emptyProps(),

    'Load Slider Images': emptyProps(),
    'Load Slider Images Success': props<{ slider: SlideModel[] }>(),
    'Load Slider Images Failure': props<{ error: string }>(),

    'Load Product Detail': props<{ productId: string }>(),
    'Load Product Detail Success': props<{ product: ProductDetailModel }>(),
    'Load Product Detail Failure': props<{ error: string }>(),

    'Load Popup Banner': emptyProps(),
    'Load Popup Banner Success': props<{ banners: PopupBannerModel[] }>(),
    'Load Popup Banner Failure': props<{ error: string }>(),

  }
});
