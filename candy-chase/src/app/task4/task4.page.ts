import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
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
  ],
})
export class Task4Page {
  constructor(
    public lollipopService: LollipopService,
    public poisonsService: PoisonsService,
  ) {
    this.checkChargingStatus();
  }

  async checkChargingStatus() {
    const batteryInfo = await Device.getBatteryInfo();
    if (batteryInfo.isCharging === true) {
      console.log('Your phone is charging');
      this.showChargingMessage();
    } else {
      console.log('Plug in your phone');
    }
  }
  showChargingMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    const message = `You connected your phone, great!
Here's your candy 🍭
You've collected ${lollipopsCollected} lollipop(s) so far.`;
  }

  showSlowChargingMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    const poisonsCollected = this.poisonsService.getPoisonsCount();
    const message = `You took too long to charge your phone and risked a low battery.
Here's your poison🧪 and your candy 🍭
You've collected ${poisonsCollected} poisons and ${lollipopsCollected} lollipop(s) so far.`;
  }
  router: Router = inject(Router);
  goToFinalPage() {
    this.router.navigate(['final-page']);
  }
}
