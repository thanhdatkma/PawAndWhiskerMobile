import { ActionReducer } from '@ngrx/store';
import { Preferences } from '@capacitor/preferences';
import { AppState, PERSISTED_SLICE_KEYS } from '../../models/app-state.model';

// ─── Storage key ─────────────────────────────────────────────────────────────

const STORE_KEY = 'ngrx_app_state';

// ─── Init action ─────────────────────────────────────────────────────────────

const NGRX_INIT = '@ngrx/store/init';

// ─── Types ───────────────────────────────────────────────────────────────────

type AnyRecord = Record<string, unknown>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deepMerge(initial: AnyRecord, saved: AnyRecord): AnyRecord {
  const result: AnyRecord = { ...initial };

  for (const key of Object.keys(saved)) {
    const savedVal = saved[key];
    const initVal = initial[key];

    if (
      savedVal !== null &&
      typeof savedVal === 'object' &&
      !Array.isArray(savedVal) &&
      initVal !== null &&
      typeof initVal === 'object' &&
      !Array.isArray(initVal)
    ) {
      result[key] = deepMerge(initVal as AnyRecord, savedVal as AnyRecord);
    } else {
      result[key] = savedVal;
    }
  }

  return result;
}

// ─── Pre-load cache ───────────────────────────────────────────────────────────

/**
 * Capacitor Preferences is async; we pre-load the value as soon as the module
 * is imported so it is ready (or nearly ready) by the time @ngrx/store/init fires.
 */
let cachedState: AnyRecord | null = null;
let hydrated = false;

Preferences.get({ key: STORE_KEY }).then(({ value }) => {
  if (value) {
    try {
      cachedState = JSON.parse(value) as AnyRecord;
    } catch {
      cachedState = null;
    }
  }
});

// ─── Persist helper ───────────────────────────────────────────────────────────

const TRANSIENT_KEYS = new Set([
  'isLoading',
  'isSubmitting',
  'error',
  'tempNotice',
]);

function buildPersistedSnapshot(state: AppState): AnyRecord {
  const snapshot: AnyRecord = {};
  const stateAsRecord = state as unknown as AnyRecord;

  for (const sliceKey of PERSISTED_SLICE_KEYS) {
    const slice = stateAsRecord[sliceKey];
    if (slice === undefined) continue;

    if (slice !== null && typeof slice === 'object' && !Array.isArray(slice)) {
      const cleaned: AnyRecord = {};
      for (const [k, v] of Object.entries(slice as AnyRecord)) {
        if (!TRANSIENT_KEYS.has(k)) {
          cleaned[k] = v;
        }
      }
      snapshot[sliceKey] = cleaned;
    } else {
      snapshot[sliceKey] = slice;
    }
  }

  return snapshot;
}

// ─── MetaReducer ─────────────────────────────────────────────────────────────

/**
 * MetaReducer — hydrates on @ngrx/store/init and persists on every subsequent action.
 *
 * Order in provideStore(): MUST come AFTER transientMetaReducer.
 *   metaReducers: [transientMetaReducer, hydrationMetaReducer]
 */
export function hydrationMetaReducer(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
  return (state, action) => {
    // ── One-time INIT hydration ────────────────────────────────────────────
    if (action.type === NGRX_INIT && !hydrated) {
      hydrated = true;
      const baseState = reducer(state, action);

      if (cachedState) {
        return deepMerge(
          baseState as unknown as AnyRecord,
          cachedState,
        ) as unknown as AppState;
      }

      return baseState;
    }

    // ── All other actions — run reducer then persist ───────────────────────
    const nextState = reducer(state, action);

    if (nextState) {
      const snapshot = buildPersistedSnapshot(nextState);
      Preferences.set({
        key: STORE_KEY,
        value: JSON.stringify(snapshot),
      }).catch((err) =>
        console.error('[HydrationMetaReducer] persist error', err),
      );
    }

    return nextState;
  };
}

/**
 * Clears the entire persisted store from Capacitor Preferences.
 * Call on logout via dispatch(UserActions.logoutSuccess) or directly.
 */
export async function clearPersistedStore(): Promise<void> {
  cachedState = null;
  hydrated = false;
  await Preferences.remove({ key: STORE_KEY });
}
