import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
  IonContent, IonList, IonItem, IonLabel, IonRadioGroup, 
  IonRadio, IonFooter, IonSegment, IonSegmentButton,
  IonIcon, IonCheckbox, ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, 
    IonContent, IonList, IonItem, IonLabel, IonRadioGroup, 
    IonRadio, IonFooter, IonSegment, IonSegmentButton,
    IonIcon, IonCheckbox
  ]
})
export class FilterSortComponent implements OnInit {
  private modalCtrl = inject(ModalController);

  @Input() initialTab: 'brands' | 'pricing' | 'tags' | 'sort' = 'brands';
  currentTab: 'brands' | 'pricing' | 'tags' | 'sort' = 'brands';

  brands = [
    { label: 'Nike', count: 120, checked: false },
    { label: 'Adidas', count: 85, checked: false },
    { label: 'Puma', count: 40, checked: false },
    { label: 'Reebok', count: 25, checked: false },
    { label: 'Under Armour', count: 18, checked: false }
  ];

  pricings = [
    { label: '$0 - $31', count: 800, checked: false },
    { label: '$31 - $64', count: 8, checked: false },
    { label: '$64 - $121', count: 3, checked: false }
  ];

  tags = [
    { label: 'New', count: 4, checked: false },
    { label: 'On Sale', count: 20, checked: false },
    { label: 'In Stock', count: 3, checked: false }
  ];

  sorts = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Brands: A to Z', value: 'brand_asc' },
    { label: 'Brands: Z to A', value: 'brand_desc' }
  ];
  selectedSort = 'price_asc';

  constructor() {
    addIcons({ closeOutline, refreshOutline });
  }

  ngOnInit() {
    this.currentTab = this.initialTab;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  reset() {
    this.brands.forEach(b => b.checked = false);
    this.pricings.forEach(p => p.checked = false);
    this.tags.forEach(t => t.checked = false);
    this.selectedSort = 'price_asc';
  }

  apply() {
    this.modalCtrl.dismiss({
      sort: this.selectedSort,
      filter: {
        brands: this.brands.filter(b => b.checked).map(b => b.label),
        pricings: this.pricings.filter(p => p.checked).map(p => p.label),
        tags: this.tags.filter(t => t.checked).map(t => t.label)
      }
    });
  }
}
