import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cameraOutline,
  calendarOutline,
  pawOutline,
} from 'ionicons/icons';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, take, Subscription, distinctUntilChanged } from 'rxjs';
import { UserActions } from '../../store/user/user.actions';
import { selectUserProfile, selectUserIsLoading } from '../../store/user/user.selectors';
import { UpdateProfilePayload } from '../../services/user.service';
import { MediaUrlPipe } from '../../pipes/media-url.pipe';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    MediaUrlPipe,
    AppHeaderComponent,
  ],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  currentUser = toSignal(this.store.select(selectUserProfile));
  isLoading$ = this.store.select(selectUserIsLoading);

  avatarPreview = signal<string>('assets/icons/avatar.svg');

  private localPreview = false;
  private subs = new Subscription();
  private mediaUrlPipe = new MediaUrlPipe();

  readonly staticPet = {
    name: 'Mochi',
    breed: 'Golden Retriever',
    birthday: 'October 12, 2021',
  };

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'camera-outline': cameraOutline,
      'calendar-outline': calendarOutline,
      'paw-outline': pawOutline,
    });
  }

  ngOnInit() {
    this.store.select(selectUserProfile).pipe(
      filter(Boolean),
      take(1),
    ).subscribe((user) => {
      this.form = this.fb.group({
        full_name: [user.name ?? '', [Validators.required, Validators.minLength(2)]],
        email: [{ value: user.email ?? '', disabled: true }],
        phone_number: [user.phone ?? ''],
      });

      if (user.avatar && !this.localPreview) {
        this.avatarPreview.set(this.mediaUrlPipe.transform(user.avatar));
      }
    });

    if (!this.currentUser()) {
      this.form = this.fb.group({
        full_name: ['', [Validators.required, Validators.minLength(2)]],
        email: [{ value: '', disabled: true }],
        phone_number: [''],
      });
    }

    this.subs.add(
      this.store.select(selectUserProfile).pipe(
        filter(Boolean),
        distinctUntilChanged((a, b) => a.avatar === b.avatar),
      ).subscribe((user) => {
        if (user.avatar && !this.localPreview) {
          this.avatarPreview.set(this.mediaUrlPipe.transform(user.avatar));
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onBack() {
    this.navCtrl.back();
  }

  onChangePhoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.localPreview = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.avatarPreview.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    this.store.dispatch(UserActions.updateAvatar({ file }));

      this.subs.add(
      this.store.select(selectUserProfile).pipe(
        filter((u) => !!u?.avatar && !u.avatar.startsWith('data:')),
        distinctUntilChanged((a, b) => a?.avatar === b?.avatar),
        take(1),
      ).subscribe((user) => {
        if (user?.avatar) {
          this.localPreview = false;
          this.avatarPreview.set(this.mediaUrlPipe.transform(user.avatar));
        }
      })
    );
  }

  onSave() {
    if (!this.form || this.form.invalid) return;

    const { full_name, phone_number } = this.form.getRawValue();
    const nameParts = (full_name as string).trim().split(/\s+/);
    const first_name = nameParts[0] ?? '';
    const last_name = nameParts.slice(1).join(' ') || undefined;

    const payload: UpdateProfilePayload = {
      first_name,
      ...(last_name && { last_name }),
      ...(phone_number && { phone_number }),
    };

    this.store.dispatch(UserActions.updateProfile({ payload }));

    this.store.select(selectUserIsLoading).pipe(
      filter((loading) => loading === false),
      take(1),
    ).subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Profile updated successfully',
        duration: 2500,
        position: 'bottom',
        color: 'success',
        buttons: [{ text: 'OK', role: 'cancel' }],
      });
      await toast.present();
      this.navCtrl.back();
    });
  }
}
