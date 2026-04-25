import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../base-component/base.component';
import { CategoryModel } from '../../../models/categories.model';

@Component({
  selector: 'quick-category-grid',
  templateUrl: './quick-category-grid.component.html',
  styleUrls: ['./quick-category-grid.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class QuickCategoryGridComponent extends BaseComponent {

  @Input({ required: true }) categories: CategoryModel[] = [];
  @Input() activeId?: string;

  @Output() categorySelect = new EventEmitter<CategoryModel>();

  onSelect(category: CategoryModel): void {
    this.categorySelect.emit(category);
  }

}
