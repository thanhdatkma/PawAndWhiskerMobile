import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryActions } from './category.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);
  private toastController = inject(ToastController);


  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      switchMap((action) =>
        this.categoryService.getCategories({
          parentId: action.parentId,
          isQuick: action.isQuick,
          includeChildren: !action.isQuick && !action.parentId
        }).pipe(
          map((categories) => CategoryActions.loadCategoriesSuccess({ categories })),
          catchError((error) => of(CategoryActions.loadCategoriesFailure({ error: error.message })))
        )
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
