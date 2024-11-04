import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth-action-complete',
    loadComponent: () => import('./auth-action-complete/auth-action-complete.page').then( m => m.AuthActionCompletePage)
  },
];
