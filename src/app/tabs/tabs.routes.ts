import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home/home.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../pages/categories/categories.component').then((m) => m.CategoriesPageComponent),
      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('../pages/alerts/alerts.component').then((m) => m.AlertsPageComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.component').then((m) => m.ProfilePageComponent),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
