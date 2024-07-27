import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ballot',
    loadComponent: () => import('./feature/ballot/ballot-page/ballot-page.component').then(m => m.BallotPageComponent),
  },
  {
    path: 'content',
    loadComponent: () => import('./feature/content/viewer/viewer.component').then(m => m.ViewerComponent),
  },
  {
    path: 'content/:id',
    loadComponent: () => import('./feature/content/viewer/viewer.component').then(m => m.ViewerComponent),
  },
  { path: '', redirectTo: 'ballot', pathMatch: 'full' },
  { path: '**', redirectTo: 'ballot' },
];
