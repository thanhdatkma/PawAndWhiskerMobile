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
  @Input() maxItems = 3;

  @Output() articleClick = new EventEmitter<NewsBriefModel>();
  @Output() seeAllClick = new EventEmitter<void>();

  get visibleArticles(): NewsBriefModel[] {
    return this.articles.slice(0, this.maxItems);
  }

  onArticleClick(article: NewsBriefModel): void {
    this.articleClick.emit(article);
  }

  onSeeAll(): void {
    this.seeAllClick.emit();
  }
}
