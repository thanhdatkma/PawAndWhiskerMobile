import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldCount',
  standalone: true
})
export class SoldCountPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '';
    
    const count = typeof value === 'string' ? parseInt(value) : value;
    if (isNaN(count)) return '';

    if (count >= 1000) {
      // Logic for 'k' suffix: 1150 -> 1.1k (truncated or specifically formatted)
      // To match 1150 -> 1.1k, we use floor to one decimal place
      const kValue = Math.floor(count / 100) / 10;
      return `${kValue}k`;
    }
    
    return count.toString();
  }

}
