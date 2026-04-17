import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseComponent } from '../base-component/base.component';
import { ScrollService } from '../../core/services/scroll.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonIcon]
})
export class SearchBarComponent extends BaseComponent {

  /** Placeholder text for the search input */
  @Input() searchPlaceholder = 'Search for food, toys...';

  @Output() searchChange = new EventEmitter<string>();

  searchTerm = '';

  barHeight = 48;
  barPadding = 16;
  barOpacity = 1;

  override ngOnInit(): void {
    this.scrollService.scrollY$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(y => this.handleScroll(y));
  }

  override handleScroll(y: number): void {
    const fadeBreakpoint = 60;
    const collapseBreakpoint = 124; // 60 + 64px (height of search bar)

    // Phase 1: 0 to 60px (Opacity Fades Out)
    if (y <= fadeBreakpoint) {
      this.barOpacity = Math.max(0, 1 - (y / fadeBreakpoint));
      this.barHeight = 48;
      this.barPadding = 16;
    }
    // Phase 2: 60 to 124px (Height/Padding Collapse)
    else if (y <= collapseBreakpoint) {
      this.barOpacity = 0;
      const collapseProgress = (y - fadeBreakpoint) / (collapseBreakpoint - fadeBreakpoint);
      const factor = Math.max(0, 1 - collapseProgress);

      this.barHeight = 48 * factor;
      this.barPadding = 16 * factor;
    }
    // Beyond 124px: Fully Hidden
    else {
      this.barOpacity = 0;
      this.barHeight = 0;
      this.barPadding = 0;
    }
  }

  onSearchInput(value: string): void {
    this.searchChange.emit(value);
  }

}
