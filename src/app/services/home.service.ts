import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsBriefModel, NewsListResponse } from '../models/news-brief.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  getNewsFeed(limit = 10, offset = 0): Observable<NewsListResponse> {
    return this.get<NewsListResponse>(`mobiconnector/v1/news`, { limit, offset });
  }

  getNewsDetail(id: number | string): Observable<NewsBriefModel> {
    return this.get<NewsBriefModel>(`mobiconnector/v1/news/${id}`);
  }
}
