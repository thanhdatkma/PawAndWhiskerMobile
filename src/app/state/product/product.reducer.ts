import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { ProductState, initialProductListState, initialProductState } from '../../models/app-state.model';

export const productReducer = createReducer(
  initialProductState,
  
  // New Arrivals
  on(ProductActions.loadProductsNewArrivals, (state) => ({
    ...state,
    newArrivals: { ...state.newArrivals, loading: true, error: null }
  })),
  on(ProductActions.loadProductsNewArrivalsSuccess, (state, { products }) => ({
    ...state,
    newArrivals: { data: products, loading: false, error: null }
  })),
  on(ProductActions.loadProductsNewArrivalsFailure, (state, { error }) => ({
    ...state,
    newArrivals: { ...state.newArrivals, loading: false, error }
  })),

  // Deal of Day
  on(ProductActions.loadProductsDealOfDay, (state) => ({
    ...state,
    dealOfDay: { ...state.dealOfDay, loading: true, error: null }
  })),
  on(ProductActions.loadProductsDealOfDaySuccess, (state, { products }) => ({
    ...state,
    dealOfDay: { data: products, loading: false, error: null }
  })),
  on(ProductActions.loadProductsDealOfDayFailure, (state, { error }) => ({
    ...state,
    dealOfDay: { ...state.dealOfDay, loading: false, error }
  })),

  // New Comments
  on(ProductActions.loadProductsComment, (state) => ({
    ...state,
    newComments: { ...state.newComments, loading: true, error: null }
  })),
  on(ProductActions.loadProductsCommentSuccess, (state, { products }) => ({
    ...state,
    newComments: { data: products, loading: false, error: null }
  })),
  on(ProductActions.loadProductsCommentFailure, (state, { error }) => ({
    ...state,
    newComments: { ...state.newComments, loading: false, error }
  })),

  // Slider
  on(ProductActions.loadSliderImages, (state) => ({
    ...state,
    slider: { ...state.slider, loading: true, error: null }
  })),
  on(ProductActions.loadSliderImagesSuccess, (state, { slider }) => ({
    ...state,
    slider: { data: slider, loading: false, error: null }
  })),
  on(ProductActions.loadSliderImagesFailure, (state, { error }) => ({
    ...state,
    slider: { ...state.slider, loading: false, error }
  })),

  // Product Detail
  on(ProductActions.loadProductDetail, (state) => ({
    ...state,
    detail: { ...state.detail, loading: true, error: null }
  })),
  on(ProductActions.loadProductDetailSuccess, (state, { product }) => ({
    ...state,
    detail: { data: product, loading: false, error: null }
  })),
  on(ProductActions.loadProductDetailFailure, (state, { error }) => ({
    ...state,
    detail: { ...state.detail, loading: false, error }
  })),

  // Popup Banner
  on(ProductActions.loadPopupBanner, (state) => ({
    ...state,
    popupBanner: { ...state.popupBanner, loading: true, error: null }
  })),
  on(ProductActions.loadPopupBannerSuccess, (state, { banners }) => ({
    ...state,
    popupBanner: { data: banners, loading: false, error: null }
  })),
  on(ProductActions.loadPopupBannerFailure, (state, { error }) => ({
    ...state,
    popupBanner: { ...state.popupBanner, loading: false, error }
  })),


  // Dog Food
  on(ProductActions.loadProductsDogFood, (state) => ({
    ...state,
    dogFood: { ...state.dogFood, loading: true, error: null }
  })),
  on(ProductActions.loadProductsDogFoodSuccess, (state, { products }) => ({
    ...state,
    dogFood: { data: products, loading: false, error: null }
  })),
  on(ProductActions.loadProductsDogFoodFailure, (state, { error }) => ({
    ...state,
    dogFood: { ...state.dogFood, loading: false, error }
  })),

  // Cat Food
  on(ProductActions.loadProductsCatFood, (state) => ({
    ...state,
    catFood: { ...state.catFood, loading: true, error: null }
  })),
  on(ProductActions.loadProductsCatFoodSuccess, (state, { products }) => ({
    ...state,
    catFood: { data: products, loading: false, error: null }
  })),
  on(ProductActions.loadProductsCatFoodFailure, (state, { error }) => ({
    ...state,
    catFood: { ...state.catFood, loading: false, error }
  }))
);

export const productListReducer = createReducer(
  initialProductListState,
  on(ProductActions.loadProductsByCategory, (state, params) => {
    const isNewRequest = !params.page || params.page === 1;
    return {
      ...state,
      searchTerm: params.searchTerm || '',
      currentPage: params.page || 1,
      loading: true,
      error: null,
      data: isNewRequest ? [] : state.data
    };
  }),
  on(ProductActions.loadProductsByCategorySuccess, (state, pagination) => ({
    ...state,
    data: pagination.pageIndex === 1 ? pagination.items : [...(state.data || []), ...pagination.items],
    hasMore: pagination.hasNextPage,
    loading: false
  })),
  on(ProductActions.loadProductsByCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductActions.resetProductList, () => initialProductListState)
);
