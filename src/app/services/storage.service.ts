import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Persist a JSON-serializable value under the given key.
   */
  async set<T>(key: string, value: T): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  /**
   * Retrieve and parse a value from storage.
   * Returns `null` when the key is absent or the value cannot be parsed.
   */
  async get<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    if (value === null || value === undefined) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  /**
   * Remove a single key from storage.
   */
  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  /**
   * Clear **all** stored keys (use with caution).
   */
  async clear(): Promise<void> {
    await Preferences.clear();
  }
}
