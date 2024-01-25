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
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.page.html',
  styleUrls: ['./task1.page.scss'],
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
    DecimalPipe,
  ],
})
export class Task1Page {
  private watchId: string | null = null;
  public distanceToTarget: number | null = null;
  private targetLocation = {
    latitude: 47.071945403994924,
    longitude: 8.348885173299777,
  };
  constructor(private router: Router) {}
  goToTaskTwo() {
    this.router.navigate(['task2']);
  }
  ngOnInit() {
    this.checkAndRequestPermissions().then(() => {
      this.startWatchingPosition();
    });
    // TODO: await
  }
  private async checkAndRequestPermissions() {
    const status = await Geolocation.checkPermissions();
    if (status.location !== 'granted') {
      await Geolocation.requestPermissions();
    }
  }
  private async startWatchingPosition() {
    try {
      const id = await Geolocation.watchPosition({}, (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }
        if (position) {
          this.distanceToTarget = this.calculateDistance(
            position.coords,
            this.targetLocation,
          );
          console.log(`Distance to target: ${this.distanceToTarget} meters`);
        }
      });
      this.watchId = id;
    } catch (err) {
      console.error('Error starting geolocation watch:', err);
    }
  }

  private calculateDistance(
    startCoords: { latitude: number; longitude: number },
    endCoords: { latitude: number; longitude: number },
  ): number {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters

    const dLat = toRad(endCoords.latitude - startCoords.latitude);
    const dLon = toRad(endCoords.longitude - startCoords.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(startCoords.latitude)) *
        Math.cos(toRad(endCoords.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  ngOnDestroy() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
}
