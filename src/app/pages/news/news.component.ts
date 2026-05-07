import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { BaseComponent } from '../../shared/components/base-component/base.component';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { HomeService } from '../../services/home.service';
import { NewsBriefModel } from '../../models/news-brief.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonContent, IonSpinner, AppHeaderComponent],
})
export class NewsComponent extends BaseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private homeService = inject(HomeService);
  private sanitizer = inject(DomSanitizer);

  article: NewsBriefModel | null = null;
  loading = true;
  error: string | null = null;

  override ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.homeService.getNewsDetail(id).subscribe({
        next: (data) => {
          this.article = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load article.';
          this.loading = false;
        },
      });
    }
  }

  get safeContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.article?.content || '');
  }

  async onShare(): Promise<void> {
    if (!this.article) return;
    try {
      if (navigator?.share) {
        await navigator.share({
          title: this.article.title,
          text: this.article.summary,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        await this.showToast('Link copied to clipboard!');
      }
    } catch {
      // Share cancelled — ignore
    }
  }
}
