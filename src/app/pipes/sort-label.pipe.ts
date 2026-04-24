import { Pipe, PipeTransform } from '@angular/core';
import { SortType } from '../enums/filter.enum';

@Pipe({
  name: 'sortLabel',
  standalone: true
})
export class SortLabelPipe implements PipeTransform {
  transform(sort: { value: SortType; label: string } | null | undefined): string {
    if (!sort || sort.value == SortType.DEFAULT) return 'Sort By';

    switch (sort.value) {
      case SortType.PRICE_ASC:
        return '$: Low - High';
      case SortType.PRICE_DESC:
        return '$: High - Low';
      case SortType.BRAND_ASC:
        return 'Brand: A - Z';
      case SortType.BRAND_DESC:
        return 'Brand: Z - A';
      default:
        return 'Sort By';
    }
  }
}
