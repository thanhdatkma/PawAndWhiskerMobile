import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Pipe({
  name: 'appCurrency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '';
    
    const amount = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(amount)) return '';

    const symbol = this.configService.activeCurrencySymbol;
    
    // Simple format: Symbol followed by value
    // You can expand this for different positioning based on currency code
    return `${symbol}${amount.toFixed(2)}`;
  }
}
