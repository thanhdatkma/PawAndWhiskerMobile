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
import { FilterTab, SortType, SORT_OPTIONS_MAP } from '../../enums/filter.enum';


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
  readonly FilterTab = FilterTab;
  readonly SortType = SortType;

  @Input() initialTab: FilterTab = FilterTab.BRANDS;
  currentTab: FilterTab = FilterTab.BRANDS;

  @Input() filterState: any;

  brands: any[] = [];
  pricings: any[] = [];
  tags: any[] = [];
  selectedSort = { 
    value: SortType.DEFAULT, 
    label: SORT_OPTIONS_MAP.get(SortType.DEFAULT)! 
  };

  sorts = Array.from(SORT_OPTIONS_MAP.entries())
    .filter(([value]) => value !== SortType.DEFAULT)
    .map(([value, label]) => ({ value, label }));

  constructor() {
    addIcons({ closeOutline, refreshOutline });
  }

  ngOnInit() {
    this.currentTab = this.initialTab;
    if (this.filterState) {
      this.brands = JSON.parse(JSON.stringify(this.filterState.brands));
      this.pricings = JSON.parse(JSON.stringify(this.filterState.pricings));
      this.tags = JSON.parse(JSON.stringify(this.filterState.tags));
      if (typeof this.filterState.selectedSort === 'string') {
        const val = this.filterState.selectedSort as SortType;
        this.selectedSort = { value: val, label: SORT_OPTIONS_MAP.get(val)! };
      } else {
        this.selectedSort = this.filterState.selectedSort;
      }
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  reset() {
    if (this.currentTab === FilterTab.BRANDS) {
      this.brands.forEach(b => b.checked = false);
    } else if (this.currentTab === FilterTab.PRICING) {
      this.pricings.forEach(p => p.checked = false);
    } else if (this.currentTab === FilterTab.TAGS) {
      this.tags.forEach(t => t.checked = false);
    } else if (this.currentTab === FilterTab.SORT) {
      this.selectedSort = { 
        value: SortType.DEFAULT, 
        label: SORT_OPTIONS_MAP.get(SortType.DEFAULT)! 
      };
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

  toggleSort(opt: any) {
    if (this.selectedSort.value === opt.value) {
      this.reset();
    } else {
      this.selectedSort = opt;
      this.apply();
    }
  }

  compareSort(o1: any, o2: any) {
    return o1 && o2 ? o1.value === o2.value : o1 === o2;
  }
}
