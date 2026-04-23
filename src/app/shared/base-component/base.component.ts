import { Directive, inject, OnDestroy, OnInit, ElementRef, HostBinding } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController, MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ScrollService } from '../../core/services/scroll.service';
import { ConfigService } from '../../services/config.service';


// Stub — replace with real service once core/services/auth.service.ts is implemented
export abstract class AuthService {
  abstract readonly currentUser$: import('rxjs').Observable<unknown>;
  abstract logout(): void;
}

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
  }

  protected readonly destroyed$ = new Subject<void>();
  protected readonly scrollService = inject(ScrollService);
  protected readonly configService = inject(ConfigService);
  protected readonly nav = inject(NavController);
  protected readonly loadingCtrl = inject(LoadingController);
  protected readonly alertCtrl = inject(AlertController);
  protected readonly toastCtrl = inject(ToastController);
  protected readonly menu = inject(MenuController);
  protected readonly el = inject(ElementRef);

  @HostBinding('attr.inert')
  get isPageHidden() {
    return this.el.nativeElement.classList.contains('ion-page-hidden') ? '' : null;
  }

  isLoading = false;

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public back(): void {
    this.nav.back();
  }

  public navigate(path: string, extras?: any): void {
    this.nav.navigateForward(path, extras);
  }

  public trackByFn(_index: number, item: { id: string | number }): string | number {
    return item.id;
  }

  public async showLoader(message = 'Please wait...'): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingCtrl.create({ message, cssClass: 'app-loader' });
    await loader.present();
    this.isLoading = true;
    return loader;
  }

  public async dismissLoader(loader?: HTMLIonLoadingElement): Promise<void> {
    this.isLoading = false;
    await (loader ?? this.loadingCtrl.dismiss().catch(() => null));
  }

  public async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
      cssClass: 'app-toast'
    });
    await toast.present();
  }

  public async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  protected onToggleMenuClick() {
    this.menu.toggle();
  }

  protected handleScroll(ev: any) {
    this.scrollService.updateScroll(ev.detail.scrollTop);
  }


  protected handleRefresh(event: any, action: string) {
    setTimeout(() => {
      console.log('handleRefresh', action);
      event.target.complete();
    }, 2000);
  }

}
