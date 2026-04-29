import { Injectable, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCtrl = inject(LoadingController);
  private count = 0;
  private el: HTMLIonLoadingElement | null = null;

  async show(): Promise<void> {
    this.count++;
    if (this.count === 1) {
      this.el = await this.loadingCtrl.create({ spinner: 'crescent', backdropDismiss: false });
      await this.el.present();
    }
  }

  async hide(): Promise<void> {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0 && this.el) {
      await this.el.dismiss();
      this.el = null;
    }
  }
}
