import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonAlert,
  IonText,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Plugin } from '@capacitor/core';
import {
  Camera,
  PermissionStatus,
  CameraPluginPermissions,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { defineCustomElement } from '@ionic/angular/standalone/directives/angular-component-lib/utils';

@Component({
  selector: 'app-camera-access',
  templateUrl: './camera-access.page.html',
  styleUrls: ['./camera-access.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonList,
    IonItem,
    IonButton,
    IonAlert,
    IonText,
  ],
})
export class CameraAccessPage {
  isCameraPermissionGranted = false;
  /*checkPermissions() => Promise<PermissionStatus>*/

  constructor(private router: Router) {}
  async checkCameraPermission() {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera === 'granted') {
      console.log('Granted');
      this.isCameraPermissionGranted = true;
    } else {
      this.requestCameraPermission();
    }
  }

  async requestCameraPermission() {
    try {
      const permissions = await Camera.requestPermissions();
      if (permissions.camera === 'granted') {
        console.log('Camera access granted.');
        this.isCameraPermissionGranted = true;
      } else {
        console.warn('Camera access denied.');
        this.isCameraPermissionGranted = false;
      }
    } catch (error) {
      console.error('Error requesting camera permissions', error);
      this.isCameraPermissionGranted = false;
    }
  }

  goToLocationPermission() {
    if (this.isCameraPermissionGranted) {
      this.router.navigate(['location-access']);
    } else {
      console.warn('Camera permission not granted. Cannot proceed');
    }
  }
}
