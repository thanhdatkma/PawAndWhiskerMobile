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

  @Input() filterState: any;

  brands: any[] = [];
  pricings: any[] = [];
  tags: any[] = [];
  selectedSort = 'price_asc';

  sorts = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Brands: A to Z', value: 'brand_asc' },
    { label: 'Brands: Z to A', value: 'brand_desc' }
  ];

  constructor() {
    addIcons({ closeOutline, refreshOutline });
  }

  ngOnInit() {
    this.currentTab = this.initialTab;
    if (this.filterState) {
      this.brands = JSON.parse(JSON.stringify(this.filterState.brands));
      this.pricings = JSON.parse(JSON.stringify(this.filterState.pricings));
      this.tags = JSON.parse(JSON.stringify(this.filterState.tags));
      this.selectedSort = this.filterState.selectedSort;
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  reset() {
    if (this.currentTab === 'brands') {
      this.brands.forEach(b => b.checked = false);
    } else if (this.currentTab === 'pricing') {
      this.pricings.forEach(p => p.checked = false);
    } else if (this.currentTab === 'tags') {
      this.tags.forEach(t => t.checked = false);
    } else if (this.currentTab === 'sort') {
      this.selectedSort = 'price_asc';
    }
    this.apply();
  }

  apply() {
    this.modalCtrl.dismiss({
      filterState: {
        brands: this.brands,
        pricings: this.pricings,
        tags: this.tags,
        selectedSort: this.selectedSort
      }
    });
  }
}
