import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../base-component/base.component';
import { QuickCategoryModel } from 'src/app/models/quick-category.model';

@Component({
  selector: 'quick-category-grid',
  templateUrl: './quick-category-grid.component.html',
  styleUrls: ['./quick-category-grid.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class QuickCategoryGridComponent extends BaseComponent {

  @Input({ required: true }) categories: QuickCategoryModel[] = [];
  @Input() activeId?: string;

  @Output() categorySelect = new EventEmitter<QuickCategoryModel>();

  onSelect(category: QuickCategoryModel): void {
    this.categorySelect.emit(category);
  }

}
