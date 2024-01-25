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
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-location-access',
  templateUrl: './location-access.page.html',
  styleUrls: ['./location-access.page.scss'],
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
export class LocationAccessPage {
  /*isLocationPermissionGranted = false;*/
  constructor(private router: Router) {}
  /*async checkLocationPermission() {
    const permissions = await Geolocation.checkPermissions();
    if (permissions.location === 'granted') {
      console.log('Granted');
      this.isLocationPermissionGranted = true;
    } else {
      this.requestLocationPermission();
    }
  }

  async requestLocationPermission() {
    try {
      const permissions = await Geolocation.requestPermissions();
      if (permissions.location === 'granted') {
        console.log('Granted');
        this.isLocationPermissionGranted = true;
      } else {
        console.warn('Denied');
        this.isLocationPermissionGranted = false;
      }
    } catch (error) {
      console.error('Error requesting camera permissions', error);
      this.isLocationPermissionGranted = false;
    }
  }

  /*private async checkLocationPermissions(): Promise<boolean> {
    const permission = await Geolocation.checkPermissions();

    if (permission.location === 'granted') {
      return true;
    }

    // Request camera permission
    const permissionRequest = await Geolocation.requestPermissions();

    return permissionRequest.location === 'granted';
  }*/
  ngOnInit() {
    this.checkAndRequestPermissions();
  }
  /*async checkAndRequestPermissions() {
    const status = await Geolocation.checkPermissions();
    if (status.location !== 'granted') {
      await Geolocation.requestPermissions();
    }
  }*/
  async checkAndRequestPermissions() {
    try {
      const status = await Geolocation.checkPermissions();
      console.log('Permission status:', status);

      if (status.location !== 'granted') {
        const newStatus = await Geolocation.requestPermissions();
        console.log('New permission status:', newStatus);
      }
    } catch (error) {
      console.error('Error checking/requesting permissions:', error);
    }
  }
  goToTaskOne() {
    this.router.navigate(['task1']);
  }
}
