import { UserProfile } from './user-profile.model';
import { ProductBriefModel } from './product-brief.model';
import { ApiState, createInitialApiState } from './api-state.model';
import { CategoryModel } from './categories.model';
import { Order } from './order.model';
import { CheckoutResponse } from './checkout.model';
import { NewsBriefModel } from './news-brief.model';
import { SlideModel } from './slides.model';
import { PopupBannerModel } from './popup-banner.model';
import { ProductDetailModel } from './product-detail.model';


// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: ProductBriefModel;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

// ─── Favorites ───────────────────────────────────────────────────────────────

export interface FavoritesState {
  ids: number[];
  isLoading: boolean;
  error: string | null;
}

export const initialFavoritesState: FavoritesState = {
  ids: [],
  isLoading: false,
  error: null,
};

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserState extends ApiState<UserProfile> {
  isLoggedIn: boolean;
  tempNotice: string | null;
}

export const initialUserState: UserState = {
  ...createInitialApiState<UserProfile>(),
  isLoggedIn: false,
  tempNotice: null,
};

// ─── Features ────────────────────────────────────────────────────────────────

export interface ProductListState extends ApiState<ProductBriefModel[]> {
  categoryIds: string[];
  currentPage: number;
  perPage: number;
  hasMore: boolean;
  searchTerm: string;
  sortBy?: string;
  sortDirection?: string;
}

export const initialProductListState: ProductListState = {
  ...createInitialApiState<ProductBriefModel[]>([]),
  categoryIds: [],
  currentPage: 1,
  perPage: 20,
  hasMore: true,
  searchTerm: '',
};

export interface ProductState {
  newArrivals: ApiState<ProductBriefModel[]>;
  dealOfDay: ApiState<ProductBriefModel[]>;
  newComments: ApiState<ProductBriefModel[]>;
  slider: ApiState<SlideModel[]>;
  detail: ApiState<ProductDetailModel>;
  popupBanner: ApiState<PopupBannerModel[]>;
  flashSale: ApiState<ProductBriefModel[]>;
}

export const initialProductState: ProductState = {
  newArrivals: createInitialApiState<ProductBriefModel[]>([]),
  dealOfDay: createInitialApiState<ProductBriefModel[]>([]),
  newComments: createInitialApiState<ProductBriefModel[]>([]),
  slider: createInitialApiState<SlideModel[]>([]),
  detail: createInitialApiState<ProductDetailModel>(),
  popupBanner: createInitialApiState<PopupBannerModel[]>([]),
  flashSale: createInitialApiState<ProductBriefModel[]>([]),
};
export interface CategoryState extends ApiState<CategoryModel[]> {
  selectedParentId: string | null;
}

export type OrderState = ApiState<Order[]>;
export type CheckoutState = ApiState<CheckoutResponse>;

export interface HomeState {
  newsFeed: ApiState<NewsBriefModel[]>;
  newsTotal: number;
  newsOffset: number;
  newsLoadingMore: boolean;
}

export const initialHomeState: HomeState = {
  newsFeed: createInitialApiState<NewsBriefModel[]>([]),
  newsTotal: 0,
  newsOffset: 0,
  newsLoadingMore: false,
};


// ─── Root AppState ────────────────────────────────────────────────────────────

export interface AppState {
  cart: CartState;
  favorites: FavoritesState;
  user: UserState;
  product: ProductState;
  productList: ProductListState;
  category: CategoryState;
  order: OrderState;
  checkout: CheckoutState;
  home: HomeState;

}

export const initialAppState: AppState = {
  cart: initialCartState,
  favorites: initialFavoritesState,
  user: initialUserState,
  product: initialProductState,
  productList: initialProductListState,
  category: {
    ...createInitialApiState<CategoryModel[]>([]),
    selectedParentId: null,
  },
  order: createInitialApiState<Order[]>([]),
  checkout: createInitialApiState<CheckoutResponse>(),
  home: initialHomeState,
};

/** Keys that are persisted to Capacitor Preferences. */
export const PERSISTED_SLICE_KEYS: (keyof AppState)[] = [
  'cart',
  'favorites',
  'user',
  'product',
  'productList',
  'category',
  'order',
  'home',

];
