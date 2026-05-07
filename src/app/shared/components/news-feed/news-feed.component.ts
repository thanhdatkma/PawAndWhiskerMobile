import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BaseComponent } from '../base-component/base.component';
import { NewsBriefModel } from '../../../models/news-brief.model';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFeedComponent extends BaseComponent {
  @Input({ required: true }) articles: NewsBriefModel[] = [];
  @Input() sectionTitle = 'Latest News';
  @Input() maxItems = 10;
  @Input() hasMore = false;
  @Input() loadingMore = false;

  @Output() articleClick = new EventEmitter<NewsBriefModel>();
  @Output() seeMoreClick = new EventEmitter<void>();
  /** kept for back-compat but no longer used in home */
  @Output() seeAllClick = new EventEmitter<void>();

  get visibleArticles(): NewsBriefModel[] {
    return this.articles;
  }

  getImageUrl(article: NewsBriefModel): string {
    return article.image_url || article.thumbnailImage || 'assets/images/no-image.png';
  }

  onArticleClick(article: NewsBriefModel): void {
    this.articleClick.emit(article);
  }

  onSeeMore(): void {
    this.seeMoreClick.emit();
  }
}
