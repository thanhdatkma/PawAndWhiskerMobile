import { UserProfile } from './user-profile.model';
import { ProductBriefModel } from './product-brief.model';

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
  ids: string[];
  isLoading: boolean;
  error: string | null;
}

export const initialFavoritesState: FavoritesState = {
  ids: [],
  isLoading: false,
  error: null,
};

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserState {
  profile: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  tempNotice: string | null;
}

export const initialUserState: UserState = {
  profile: null,
  isLoggedIn: false,
  isLoading: false,
  isSubmitting: false,
  error: null,
  tempNotice: null,
};

// ─── Root AppState ────────────────────────────────────────────────────────────

export interface AppState {
  cart: CartState;
  favorites: FavoritesState;
  user: UserState;
}

export const initialAppState: AppState = {
  cart: initialCartState,
  favorites: initialFavoritesState,
  user: initialUserState,
};

/** Keys that are persisted to Capacitor Preferences. */
export const PERSISTED_SLICE_KEYS: (keyof AppState)[] = [
  'cart',
  'favorites',
  'user',
];
