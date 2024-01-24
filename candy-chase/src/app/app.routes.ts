import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'instructions',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },

];
