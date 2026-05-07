import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, ProductListState } from '../../models/app-state.model';

// ─── Base Feature Selectors ───────────────────────────────────────────────────
export const selectProductState = createFeatureSelector<ProductState>('product');
export const selectProductListState = createFeatureSelector<ProductListState>('productList');

// ─── Product Feature Selectors (Nested ApiStates) ─────────────────────────────

// New Arrivals
export const selectNewArrivalsState = createSelector(selectProductState, (state) => state.newArrivals);
export const selectNewArrivals = createSelector(selectNewArrivalsState, (state) => state.data || []);
export const selectNewArrivalsLoading = createSelector(selectNewArrivalsState, (state) => state.loading);

// Deal of Today
export const selectDealOfDayState = createSelector(selectProductState, (state) => state.dealOfDay);
export const selectDealOfDay = createSelector(selectDealOfDayState, (state) => state.data || []);
export const selectDealOfDayLoading = createSelector(selectDealOfDayState, (state) => state.loading);

// New Comments
export const selectNewCommentsState = createSelector(selectProductState, (state) => state.newComments);
export const selectNewComments = createSelector(selectNewCommentsState, (state) => state.data || []);
export const selectNewCommentsLoading = createSelector(selectNewCommentsState, (state) => state.loading);

// Flash Sale
export const selectFlashSaleState = createSelector(selectProductState, (state) => state.flashSale);
export const selectFlashSale = createSelector(selectFlashSaleState, (state) => state.data || []);
export const selectFlashSaleLoading = createSelector(selectFlashSaleState, (state) => state.loading);

// Slider Images
export const selectProductSliderState = createSelector(selectProductState, (state) => state.slider);
export const selectProductSlider = createSelector(selectProductSliderState, (state) => state.data || []);
export const selectProductSliderLoading = createSelector(selectProductSliderState, (state) => state.loading);

// Product Detail
export const selectProductDetailState = createSelector(selectProductState, (state) => state.detail);
export const selectProductDetail = createSelector(selectProductDetailState, (state) => state.data);
export const selectProductDetailLoading = createSelector(selectProductDetailState, (state) => state.loading);

// Popup Banner
export const selectPopupBannerState = createSelector(selectProductState, (state) => state.popupBanner);
export const selectPopupBanners = createSelector(selectPopupBannerState, (state) => state.data ?? []);
export const selectPopupBanner = createSelector(selectPopupBanners, (banners) => banners[0] ?? null);
export const selectPopupBannerLoading = createSelector(selectPopupBannerState, (state) => state.loading);



// ─── Product List Selectors (Paginated/Filtered) ───────────────────────────────

export const selectProductList = createSelector(
  selectProductListState,
  (state) => state.data || []
);

export const selectProductListLoading = createSelector(
  selectProductListState,
  (state) => state.loading
);

export const selectProductListHasMore = createSelector(
  selectProductListState,
  (state) => state.hasMore
);

export const selectProductListCurrentPage = createSelector(
  selectProductListState,
  (state) => state.currentPage
);

export const selectProductListError = createSelector(
  selectProductListState,
  (state) => state.error
);
