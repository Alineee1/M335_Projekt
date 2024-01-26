import { ChangeDetectorRef, Component } from '@angular/core';
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
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Geolocation } from '@capacitor/geolocation';
import { DecimalPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PoisonsService } from '../services/poisons.service';
import { LollipopService } from '../services/lollipop.service';
import { TimeService } from '../services/time.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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
    NgIf,
    IonButtons,
    IonIcon,
  ],
})
export class Task1Page {
  isLocationReached = false;
  reachedMessage = '';
  private watchId: string | null = null;
  public distanceToTarget: number | null = null;
  private scanStartTime: number = 0;
  private timeLimitForFastScan: number = 90000;
  public congratulationsMessage = '';
  public failureMessage = '';
  private thresholdDistance: number = 10; //distance in m
  private targetLocation = {
    latitude: 47.071945403994924,
    longitude: 8.348885173299777,
  };
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private timeService: TimeService,
    private lollipopService: LollipopService,
  ) {}
  goToTaskTwo() {
    this.router.navigate(['task2']);
  }
  async ngOnInit() {
    this.timeService.startTimer();
    await this.checkAndRequestPermissions();
    await this.startWatchingPosition();
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
      await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          if (err) {
            console.error('Error watching position:', err);
            return;
          }
          if (position) {
            const distance = this.calculateDistance(
              position.coords,
              this.targetLocation,
            );

            if (distance <= this.thresholdDistance) {
              this.distanceToTarget = 0;
              this.isLocationReached = true;
              this.reachedMessage = 'You reached your destination!';
              this.lollipopService.collectLollipop();
              Haptics.impact({
                style: ImpactStyle.Medium,
              });
            } else {
              this.distanceToTarget = distance;
            }
            console.log(`Distance to target: ${this.distanceToTarget} meters`);
            this.cd.detectChanges();
          }
        },
      );
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
    const elapsedTime = this.timeService.stopTimer();
    console.log(`Elapsed time in Task1Page: ${elapsedTime} milliseconds`);

    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
  cancelTask() {
    this.router.navigate(['']);
  }
}
