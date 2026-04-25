import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { SlideModel } from 'src/app/models/slides.model';

register();

@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerSliderComponent {

  @Input() banners: SlideModel[] = [];

  onBannerClick(banner: any) {
    console.log('Banner clicked:', banner.title);
  }

}
