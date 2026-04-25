import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsBriefModel } from '../models/news-brief.model';
import { BaseService } from './base.service';

import { of } from 'rxjs';
import mockData from '../../../test/mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  getNewsFeed(): Observable<NewsBriefModel[]> {
    return this.get<NewsBriefModel[]>(`api/news`);
  }
}
