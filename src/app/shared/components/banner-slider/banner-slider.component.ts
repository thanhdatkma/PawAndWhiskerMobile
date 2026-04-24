import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { SlideModel } from 'src/app/models/slides.model';
import { HomeService } from 'src/app/services/home.service';
import { inject } from '@angular/core';

register();

@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerSliderComponent implements OnInit {

  private homeService = inject(HomeService);
  banners: SlideModel[] = this.homeService.getBanners();

  constructor() { }

  ngOnInit() { }

  onBannerClick(banner: any) {
    console.log('Banner clicked:', banner.title);
  }

}
