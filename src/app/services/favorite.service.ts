import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly FAVORITES_KEY = 'favorites';
  private favoritesSubject = new BehaviorSubject<number[]>(this.loadFavorites());

  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.initStorageListener();
  }

  private initStorageListener(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === this.FAVORITES_KEY) {
        this.favoritesSubject.next(this.loadFavorites());
      }
    });
  }

  private loadFavorites(): number[] {
    const favorites = localStorage.getItem(this.FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(productId: number): boolean {
    const favorites = [...this.getFavorites()];
    const index = favorites.indexOf(productId);
    let isAdded = false;

    if (index > -1) {
      favorites.splice(index, 1);
      isAdded = false;
    } else {
      favorites.push(productId);
      isAdded = true;
    }

    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
    return isAdded;
  }


  isFavorite(productId: number | undefined): boolean {
    if (!productId) {
      return false;
    }
    return this.favoritesSubject.getValue().includes(productId);
  }


  getFavorites(): number[] {
    return this.favoritesSubject.getValue();
  }
}
