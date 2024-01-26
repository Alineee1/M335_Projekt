import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Geolocation, Position } from '@capacitor/geolocation';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.page.html',
  styleUrls: ['./task2.page.scss'],
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
export class Task2Page implements OnInit {
  private watchId: string | null = null;
  public distanceWalked: number = 0;
  private startPosition: Position | null = null;
  private targetDistance: number = 15; // target distance in meters
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.startWatchingPosition();
  }
  public get remainingDistance(): number {
    const remaining = this.targetDistance - this.distanceWalked;
    return remaining > 0 ? remaining : 0; // Ensure the remaining distance doesn't go below zero
  }
  private async startWatchingPosition() {
    try {
      this.watchId = await Geolocation.watchPosition({}, (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }
        if (position) {
          if (!this.startPosition) {
            this.startPosition = position; // Set initial position
          } else {
            this.distanceWalked = this.calculateDistance(
              this.startPosition.coords,
              position.coords,
            );
            if (this.distanceWalked >= this.targetDistance) {
              // Stop watching position when target distance is reached
              Geolocation.clearWatch({ id: this.watchId! });
            }
            console.log(`Distance walked: ${this.distanceWalked} meters`);
            this.cd.detectChanges(); // Trigger UI update
          }
        }
      });
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

  goToTaskThree() {
    this.router.navigate(['task3']);
  }
}
