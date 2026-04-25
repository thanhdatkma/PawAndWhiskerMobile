import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductActions } from './product.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import mockData from '../../../../test/mock-data.json';
import { ProductDetailModel } from 'src/app/models/product-detail.model';
import { ProductBriefModel } from 'src/app/models/product-brief.model';
import { SlideModel } from 'src/app/models/slides.model';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private toastController = inject(ToastController);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductDetail),
      switchMap((action) => {
        return of(ProductActions.loadProductDetailSuccess({
          product: mockData.product_detail as ProductDetailModel
        }))
      })
    )
  );


  loadSlideImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadSliderImages),
      switchMap(() => {
        return of(ProductActions.loadSliderImagesSuccess({
          slider: mockData.banners as SlideModel[]
        }))
      })
    )
  );

  loadPopupBanners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadPopupBanner),
      switchMap(() =>
        this.productService.getPopupBanners().pipe(
          map((banner) => ProductActions.loadPopupBannerSuccess({ banner })),
          catchError((error) => of(ProductActions.loadPopupBannerFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsByCategory),
      // switchMap((action) =>
      //   this.categoryService.getProductByCategories(action).pipe(
      //     map((pagination) =>
      //       ProductActions.loadProductsByCategorySuccess(pagination)
      //     ),
      //     catchError((error) => of(ProductActions.loadProductsByCategoryFailure({ error: error.message })))
      //   )
      // )
      switchMap((action) => {
        let items = mockData.products as ProductBriefModel[];
        const catIds = action.categoryIds;
        const firstCatId = Array.isArray(catIds) ? catIds[0] : catIds;

        if (firstCatId?.startsWith('1-')) {
          items = mockData.dog_products as ProductBriefModel[];
        } else if (firstCatId?.startsWith('2-')) {
          items = mockData.cat_products as ProductBriefModel[];
        }

        return of(ProductActions.loadProductsByCategorySuccess({
          items: items,
          totalCount: items.length,
          pageIndex: action.page || 1,
          pageSize: action.perPage || 20,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false
        }));
      })
    )
  );


  loadProductsNewArrivals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsNewArrivals),
      switchMap(() => {
        return of(ProductActions.loadProductsNewArrivalsSuccess({
          products: mockData.new_arrivals as ProductBriefModel[]
        }))
      })
    )
  );

  loadProductsDealOfDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsDealOfDay),
      switchMap((action) =>
        this.productService.getDealOfToday().pipe(
          map((products) => ProductActions.loadProductsDealOfDaySuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsDealOfDayFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsComment),
      switchMap((action) =>
        this.productService.getNewComment().pipe(
          map((products) => ProductActions.loadProductsCommentSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsCommentFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsDogFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsDogFood),
      switchMap(() => {
        return of(ProductActions.loadProductsDogFoodSuccess({
          products: mockData.dog_products as ProductBriefModel[]
        }))
      })
    )
  );

  loadProductsCatFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsCatFood),
      switchMap(() => {
        return of(ProductActions.loadProductsCatFoodSuccess({
          products: mockData.cat_products as ProductBriefModel[]
        }))
      })
    )
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProductActions.loadProductDetailFailure,
          ProductActions.loadProductsByCategoryFailure,
          ProductActions.loadSliderImagesFailure,
          ProductActions.loadPopupBannerFailure,
          ProductActions.loadProductsDogFoodFailure,
          ProductActions.loadProductsCatFoodFailure,
          ProductActions.loadProductsNewArrivalsFailure,
          ProductActions.loadProductsDealOfDayFailure,
          ProductActions.loadProductsCommentFailure
        ),
        tap(async (action) => {
          const error = (action as any).error;
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

