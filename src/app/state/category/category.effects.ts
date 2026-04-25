import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryActions } from './category.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { CategoryService } from '../../services/category.service';

import mockData from '../../../../test/mock-data.json';
import { CategoryModel } from 'src/app/models/categories.model';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);
  private toastController = inject(ToastController);


  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      switchMap((action) => {
        return of(CategoryActions.loadCategoriesSuccess({ 
          categories: mockData.categories as CategoryModel[] 
        }))
      }
        // this.categoryService.getCategories(action).pipe(
        //   map((categories) => CategoryActions.loadCategoriesSuccess({ categories })),
        //   catchError((error) => of(CategoryActions.loadCategoriesFailure({ error: error.message })))
        // )
      )
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.loadCategoriesFailure),
        tap(async ({ error }) => {
          const toast = await this.toastController.create({
            message: error,
            duration: 3000,
            color: 'danger',
            position: 'bottom',
          });
          await toast.present();
        })
      ),
    { dispatch: false }
  );
}
