import { Routes } from '@angular/router';
import {QrCodePage} from "./qr-code/qr-code.page";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'instructions',
    loadComponent: () => import('./instructions/instructions.page').then( m => m.InstructionsPage)
  },
  {
    path: 'qr-code',
    loadComponent: () => import('./qr-code/qr-code.page').then( m => m.QrCodePage)
  },
  {
    path: 'camera-access',
    loadComponent: () => import('./camera-access/camera-access.page').then( m => m.CameraAccessPage)
  },  {
    path: 'location-access',
    loadComponent: () => import('./location-access/location-access.page').then( m => m.LocationAccessPage)
  },
  {
    path: 'task1',
    loadComponent: () => import('./task1/task1.page').then( m => m.Task1Page)
  },
  {
    path: 'task2',
    loadComponent: () => import('./task2/task2.page').then( m => m.Task2Page)
  },
  {
    path: 'task3',
    loadComponent: () => import('./task3/task3.page').then( m => m.Task3Page)
  },
  {
    path: 'task4',
    loadComponent: () => import('./task4/task4.page').then( m => m.Task4Page)
  },
  {
    path: 'final-page',
    loadComponent: () => import('./final-page/final-page.page').then( m => m.FinalPagePage)
  },




];
