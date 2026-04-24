import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonRefresher, IonRefresherContent,
  IonGrid, IonRow, IonCol, IonText, IonImg
} from '@ionic/angular/standalone';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { CategoryModel } from '../../models/categories.model';
import { CategoryService } from '../../services/category.service';

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

  private categoryService = inject(CategoryService);
  categories: CategoryModel[] = [];
  selectedParent: CategoryModel | null = null;
  searchTerm = '';

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.categories = this.categoryService.getCategories();
    if (this.categories.length > 0) {
      this.selectedParent = this.categories[0];
    }
  }

  selectParent(category: CategoryModel) {
    this.selectedParent = category;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
  }
}


