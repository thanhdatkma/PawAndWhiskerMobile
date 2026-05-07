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
      // switchMap((action) =>
      //   this.productService.getProductDetail(action.productId).pipe(
      //     map((product) => ProductActions.loadProductDetailSuccess({ product })),
      //     catchError((error) => of(ProductActions.loadProductDetailFailure({ error: error.message })))
      //   )
      // )
    )
  );


  loadSlideImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadSliderImages),
      switchMap(() =>
        this.productService.getSlideImages().pipe(
          map((slider) => ProductActions.loadSliderImagesSuccess({ slider })),
          catchError((error) => of(ProductActions.loadSliderImagesFailure({ error: error.message })))
        )
      )
    )
  );

  loadPopupBanners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadPopupBanner),
      switchMap(() =>
        this.productService.getPopupBanners().pipe(
          map((banners) => ProductActions.loadPopupBannerSuccess({ banners })),
          catchError((error) => of(ProductActions.loadPopupBannerFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsByCategory),
      switchMap((action) => {
        const catIds = action.categoryIds;
        const firstCatId = Array.isArray(catIds) ? catIds[0] : (catIds || 'dog');
        return this.productService.getCategoryProducts(firstCatId).pipe(
          map(products => {
            const page = action.page || 1;
            const perPage = action.perPage || 10;
            const totalCount = products.length;
            const totalPages = Math.ceil(totalCount / perPage);
            const start = (page - 1) * perPage;
            const pagedItems = products.slice(start, start + perPage);

            return ProductActions.loadProductsByCategorySuccess({
              items: pagedItems,
              totalCount: totalCount,
              pageIndex: page,
              pageSize: perPage,
              totalPages: totalPages,
              hasPreviousPage: page > 1,
              hasNextPage: page < totalPages
            });
          }),
          catchError((error) => of(ProductActions.loadProductsByCategoryFailure({ error: error.message })))
        );
      })


    )
  );


  loadProductsNewArrivals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsNewArrivals),
      switchMap(() =>
        this.productService.getNewArrivals().pipe(
          map((products) => ProductActions.loadProductsNewArrivalsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsNewArrivalsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsDealOfDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsDealOfDay),
      switchMap(() =>
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
      switchMap(() =>
        this.productService.getNewComment().pipe(
          map((products) => ProductActions.loadProductsCommentSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsCommentFailure({ error: error.message })))
        )
      )
    )
  );

  loadProductsFlashSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsFlashSale),
      switchMap(() =>
        this.productService.getFlashSale().pipe(
          map((products) => ProductActions.loadProductsFlashSaleSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFlashSaleFailure({ error: error.message })))
        )
      )
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
          ProductActions.loadProductsNewArrivalsFailure,
          ProductActions.loadProductsDealOfDayFailure,
          ProductActions.loadProductsCommentFailure,
          ProductActions.loadProductsFlashSaleFailure
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

