/**
 * Generic interface for HTTP API states in the store.
 */
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Helper to create an initial ApiState.
 */
export function createInitialApiState<T>(initialData: T | null = null): ApiState<T> {
  return {
    data: initialData,
    loading: false,
    error: null,
  };
}
