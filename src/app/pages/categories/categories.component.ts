import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonRefresher, IonRefresherContent,
  IonGrid, IonRow, IonCol, IonText, IonImg
} from '@ionic/angular/standalone';
import { ScrollService } from '../../core/services/scroll.service';
import { BaseComponent } from '../../shared/base-component/base.component';
import { CategoryModel } from '../../models/categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg
  ]
})
export class CategoriesPageComponent extends BaseComponent implements OnInit {

  categories: CategoryModel[] = [
    {
      id: 'dog',
      name: 'Dog Essentials',
      iconName: 'pets',
      children: [
        {
          id: '1-1', name: 'Food', image: 'assets/images/dog_food.jpg',
          iconName: ''
        },
        {
          id: '1-2', name: 'Toys', image: 'assets/images/dog_toys.jpg',
          iconName: ''
        },
        {
          id: '1-3', name: 'Beds', image: 'assets/images/dog_beds.jpg',
          iconName: ''
        },
        {
          id: '1-4', name: 'Health', image: 'assets/images/dog_health.jpg',
          iconName: ''
        },
        {
          id: '1-5', name: 'Grooming', image: 'assets/images/dog_grooming.jpg',
          iconName: ''
        },
        {
          id: '1-6', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        },
        {
          id: '1-7', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        },
        {
          id: '1-8', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        },
        {
          id: '1-9', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        },
        {
          id: '1-10', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        },
        {
          id: '1-11', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        },
        {
          id: '1-12', name: 'Leashes', image: 'assets/images/dog_leashes.jpg',
          iconName: ''
        }
      ]
    },
    {
      id: 'cat',
      name: 'Cat Essentials',
      iconName: 'cruelty_free',
      children: [
        {
          id: '2-1', name: 'Cat Food', image: 'assets/images/dog_food.jpg',
          iconName: ''
        },
        {
          id: '2-2', name: 'Cat Toys', image: 'assets/images/dog_toys.jpg',
          iconName: ''
        }
      ]
    },
    { id: 'clinic', name: 'Clinic & Hospital', iconName: 'medical_services' },
    { id: 'services', name: 'Services & Grooming', iconName: 'content_cut' },
    { id: 'accessories', name: 'Accessories & Supplies', iconName: 'shopping_bag' },
    { id: 'pharmacy', name: 'Pharmacy & Health', iconName: 'medication' }
  ];


  selectedParent: CategoryModel = this.categories[0];
  searchTerm = '';

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  selectParent(category: CategoryModel) {
    this.selectedParent = category;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
  }
}


