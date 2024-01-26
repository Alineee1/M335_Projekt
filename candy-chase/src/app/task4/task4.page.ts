import { Component } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
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
import { Device } from '@capacitor/device';
import { LollipopService } from '../lollipop.service';
import { PoisonsService } from '../poisons.service';
import { ChangeDetectorRef } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-task4',
  templateUrl: './task4.page.html',
  styleUrls: ['./task4.page.scss'],
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
  ],
})
export class Task4Page {
  isPhoneCharging = false;
  isPhoneChargingSlow = false;
  congratulationsMessage = '';
  slowChargingMessage = '';
  notChargingMessage = '';
  chargingStartTime: number = 0;
  constructor(
    public lollipopService: LollipopService,
    public poisonsService: PoisonsService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.checkChargingStatus();
  }

  async checkChargingStatus() {
    this.chargingStartTime = Date.now();
    const batteryInfo = await Device.getBatteryInfo();
    if (batteryInfo.isCharging === true) {
      this.isPhoneCharging = true;
      console.log('Your phone is charging');
      this.showChargingMessage();
    } else {
      this.isPhoneCharging = false;
      this.showNotChargingMessage();
      console.log('Plug in your phone');
      //retry after a delay
      setTimeout(() => {
        this.checkChargingStatus();
      }, 5000);
    }
    const elapsedTime = Date.now() - this.chargingStartTime;
    const elapsedMinutes = elapsedTime / (1000 * 60);
    if (!this.isPhoneCharging && elapsedMinutes > 1) {
      this.isPhoneChargingSlow = true;
      this.showSlowChargingMessage();
    }
    this.changeDetectorRef.detectChanges();
  }

  showChargingMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    this.congratulationsMessage = `You connected your phone, great!
Here's your candy 🍭
You've collected ${lollipopsCollected} lollipop(s) so far.`;
  }

  showSlowChargingMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    const poisonsCollected = this.poisonsService.getPoisonsCount();
    this.slowChargingMessage = `You took too long to charge your phone and risked a low battery.
    Here's your poison🧪 and your candy 🍭
    You've collected ${poisonsCollected} poisons and ${lollipopsCollected} lollipop(s) so far.`;
  }
  showNotChargingMessage() {
    this.notChargingMessage = 'Charge your phone';
  }
  goToFinalPage() {
    this.router.navigate(['final-page']);
  }
}
