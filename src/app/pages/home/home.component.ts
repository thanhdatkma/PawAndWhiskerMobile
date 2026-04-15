import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { BannerSliderComponent } from '../../shared/banner-slider/banner-slider.component';
import { QuickCategoryGridComponent } from '../../shared/quick-category-grid/quick-category-grid.component';
import { QuickCategoryModel } from 'src/app/models/quick-category.model';
import { BaseComponent } from '../../shared/base-component/base.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonMenuButton, IonButton, IonIcon, BannerSliderComponent, QuickCategoryGridComponent
  ],
})
export class HomePageComponent extends BaseComponent {
  activeId = 'dog'
  categories: QuickCategoryModel[] = [
    { id: 'dog', title: 'Dog', iconName: 'pets', type: 'product' },
    { id: 'cat', title: 'Cat', iconName: 'cruelty_free', type: 'product' },
    { id: 'clinic', title: 'Clinic', iconName: 'medical_services', type: 'service' },
    { id: 'services', title: 'Services', iconName: 'content_cut', type: 'service' },
    { id: 'accessories', title: 'Accessories', iconName: 'shopping_bag', type: 'product' },
    { id: 'pharmacy', title: 'Pharmacy', iconName: 'medication', type: 'product' }
  ];

  // newArrivals: ProductBriefDTO[] = [
  //   { id: 'na1', name: 'Organic Royal Canin Kibble', coverImage: 'assets/images/asset_1.png', price: 35.00, discountPrice: 29.75, discountPct: 15, rating: 4.8 },
  //   { id: 'na2', name: 'Plush Donut Squeaky Toy', coverImage: 'assets/images/asset_4.png', price: 15.00, discountPrice: 12.50, discountPct: 15, rating: 4.8 }
  // ];

  // dogProducts: ProductBriefDTO[] = [
  //   { id: 'dp1', name: 'Beef & Rice Kibble', coverImage: 'assets/images/asset_2.png', price: 42.00, discountPrice: 35.70, discountPct: 15, rating: 4.9 },
  //   { id: 'dp2', name: 'Indestructible Chew Ball', coverImage: 'assets/images/asset_3.png', price: 12.99, rating: 4.6 }
  // ];

  // catProducts: ProductBriefDTO[] = [
  //   { id: 'cp1', name: 'Cat Dental Treats Bag', coverImage: 'assets/images/asset_2.png', price: 11.99, discountPrice: 9.99, discountPct: 15, rating: 4.8 },
  //   { id: 'cp2', name: 'Modern Pine Tower', coverImage: 'assets/images/asset_1.png', price: 89.00, rating: 4.7 }
  // ];

  // news: NewsBriefDTO[] = [
  //   { id: 'n1', title: 'Top 5 tips for summer pet hydration', summary: 'As temperatures rise, keeping your furry friends cool is more important than ever...', thumbnailImage: 'assets/images/asset_1.png' },
  //   { id: 'n2', title: 'New social distancing rules for dog parks', summary: 'The local community has updated guidelines for our favourite play areas...', thumbnailImage: 'assets/images/asset_2.png' }
  // ];
  constructor() {
    super();
  }

}
