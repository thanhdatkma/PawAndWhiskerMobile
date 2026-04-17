import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private STORAGE_KEY = 'app_notifications';
  private initialNotifications: NotificationModel[] = [
    {
      id: 'a1',
      type: 'critical',
      icon: 'assets/icons/medical.svg',
      category: 'Medical',
      highlight: 'Critical',
      title: 'Sắp đến lịch tiêm vắc-xin',
      description: 'Vắc-xin dại (hàng năm) cho Max cần được tiêm trước ngày 25/05/2026 tại phòng khám Paws Health.',
      actionText: 'Đặt hẹn khám ngay',
      isRead: false
    },
    {
      id: 'a2',
      type: 'confirmed',
      icon: 'assets/icons/delivery.svg',
      category: 'Delivery',
      highlight: 'Confirmed',
      title: 'Đơn hàng của bạn đã được giao',
      description: 'Gói đồ chơi và pate hữu cơ \'Organi-Treats\' cho Max đã được giao đến cửa hàng.',
      actionText: 'Xem đơn hàng',
      isRead: false
    },
    {
      id: 'a3',
      type: 'recurring',
      icon: 'assets/icons/medication.svg',
      category: 'Medication',
      highlight: 'Recurring',
      title: 'Nhắc nhở thuốc PawsGuard',
      description: 'Đã đến giờ cho Max uống thuốc PawsGuard',
      isInteractive: true,
      isRead: false
    },
    {
      id: 'a4',
      type: 'special-offer',
      icon: 'assets/icons/service.svg',
      category: 'Service',
      highlight: 'Special Offer',
      title: 'Ưu đãi đặc biệt: Gói Spa \'Groom & Glow\'',
      description: 'Giảm 15% gói spa toàn diện cho Max. Đặt ngay để nhận ưu đãi!',
      actionText: 'Xem ưu đãi',
      isRead: false
    }
  ];

  private notificationsSubject = new BehaviorSubject<NotificationModel[]>(this.loadNotifications());
  notifications$ = this.notificationsSubject.asObservable();

  unreadCount$ = this.notifications$.pipe(
    map(notifications => notifications.filter(n => !n.isRead).length)
  );

  constructor() {}

  private loadNotifications(): NotificationModel[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing notifications from storage', e);
      }
    }
    return this.initialNotifications;
  }

  private saveNotifications(notifications: NotificationModel[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
    this.notificationsSubject.next(notifications);
  }

  markAsRead(id: string) {
    const current = this.notificationsSubject.value;
    const updated = current.map(n => n.id === id ? { ...n, isRead: true } : n);
    this.saveNotifications(updated);
  }

  markAllAsRead() {
    const current = this.notificationsSubject.value;
    const updated = current.map(n => ({ ...n, isRead: true }));
    this.saveNotifications(updated);
  }
}
