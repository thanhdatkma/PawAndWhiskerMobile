import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSearchbar,
  IonContent, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol,
  IonText, IonImg
} from '@ionic/angular/standalone';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { Store } from '@ngrx/store';
import { CategoryActions } from '../../state/category/category.actions';
import { selectAllCategories, selectSelectedParentId, selectSelectedParent, selectActiveChildCategories, selectCategoriesLoading } from '../../state/category/category.selectors';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonSearchbar,
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
  
  categories$ = this.store.select(selectAllCategories);
  selectedParentId$ = this.store.select(selectSelectedParentId);
  selectedParent$ = this.store.select(selectSelectedParent);
  childCategories$ = this.store.select(selectActiveChildCategories);
  isLoading$ = this.store.select(selectCategoriesLoading);

  searchTerm = '';

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.store.dispatch(CategoryActions.loadCategories({}));
  }

  selectParent(id: string) {
    this.store.dispatch(CategoryActions.selectParentCategory({ id }));
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
  }

  override handleRefresh(event: any) {
    this.store.dispatch(CategoryActions.loadCategories({}));
    event.target.complete();
  }
}


