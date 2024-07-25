import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'ballot', loadComponent: () => import('./feature/ballot/ballot-page/ballot-page.component').then(m => m.BallotPageComponent) },
    { path: '', redirectTo: 'ballot', pathMatch: 'full' },
    { path: '**', redirectTo: 'ballot' },
];
