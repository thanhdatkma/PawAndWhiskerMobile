export interface NotificationModel {
  id: string;
  type: 'critical' | 'confirmed' | 'recurring' | 'special-offer';
  icon: string;
  category: string;
  highlight: string;
  title: string;
  description?: string;
  actionText?: string;
  isInteractive?: boolean;
  isRead: boolean;
}
