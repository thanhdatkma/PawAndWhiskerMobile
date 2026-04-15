import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { SlideModel } from 'src/app/models/slides.model';

register();

@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerSliderComponent implements OnInit {

  banners: SlideModel[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1000',
      title: 'The Sanctuary',
      tagline: 'SUMMER VIBES',
      description: 'Premium Pet Boutique & Apothecary',
      buttonText: 'Shop Now',
      linkTo: '/shop'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000',
      title: 'Spring Collection',
      tagline: 'SUMMER VIBES',
      description: 'New arrivals for your furry friends',
      buttonText: 'Discover More',
      linkTo: '/shop'
    }
  ];

  constructor() { }

  ngOnInit() { }

  onBannerClick(banner: any) {
    console.log('Banner clicked:', banner.title);
  }

}
