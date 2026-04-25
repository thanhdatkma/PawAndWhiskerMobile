import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

export abstract class BaseService {
  protected http = inject(HttpClient);
  protected configService = inject(ConfigService);


  protected get<T>(endpoint: string, params?: any): Observable<T> {
    const baseUrl = this.configService.settings?.baseUrl || '';
    return this.http.get<T>(`${baseUrl}${endpoint}`, { params: this.createParams(params) });
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    const baseUrl = this.configService.settings?.baseUrl || '';
    return this.http.post<T>(`${baseUrl}${endpoint}`, body);
  }

  private createParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }
}
