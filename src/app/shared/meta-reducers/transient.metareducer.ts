import { ActionReducer } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';

/**
 * Properties that are considered transient (runtime-only).
 * These will be stripped from all state slices before the state is persisted.
 */
const TRANSIENT_KEYS = new Set<string>([
  'isLoading',
  'isSubmitting',
  'error',
  'tempNotice',
]);

type AnyRecord = Record<string, unknown>;

/**
 * Recursively strips all transient keys from a state object.
 */
function stripTransient(state: AnyRecord): AnyRecord {
  const result: AnyRecord = {};

  for (const key of Object.keys(state)) {
    if (TRANSIENT_KEYS.has(key)) continue;

    const value = state[key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = stripTransient(value as AnyRecord);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * MetaReducer — strips transient runtime flags from every state slice.
 *
 * Guaranteed to run BEFORE hydrationMetaReducer so the data written
 * to Capacitor Preferences is always clean.
 *
 * Usage in provideStore():
 *   metaReducers: [transientMetaReducer, hydrationMetaReducer]
 */
export function transientMetaReducer(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    if (!nextState) return nextState;

    const cleaned: AnyRecord = {};

    for (const sliceKey of Object.keys(nextState) as (keyof AppState)[]) {
      const slice = (nextState as unknown as AnyRecord)[sliceKey];

      if (slice !== null && typeof slice === 'object' && !Array.isArray(slice)) {
        // Strip transient keys for persistence...
        const stripped = stripTransient(slice as AnyRecord);

        // ...then re-attach transient keys from the raw state so in-memory
        // selectors still work correctly.
        const raw = slice as AnyRecord;
        for (const k of Object.keys(raw)) {
          if (TRANSIENT_KEYS.has(k)) {
            stripped[k] = raw[k];
          }
        }

        cleaned[sliceKey] = stripped;
      } else {
        cleaned[sliceKey] = slice;
      }
    }

    return cleaned as unknown as AppState;
  };
}
