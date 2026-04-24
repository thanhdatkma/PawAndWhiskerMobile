import { Injectable } from '@angular/core';
import mockData from '../../../test/mock-data.json';
import { SlideModel } from '../models/slides.model';
import { NewsBriefModel } from '../models/news-brief.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  getBanners = (): SlideModel[] => mockData.banners as any[];
  getNewsFeed = (): NewsBriefModel[] => mockData.news_feed as any[];
}
