import { ChangeDetectorRef, Component } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Device } from '@capacitor/device';
import { LollipopService } from '../services/lollipop.service';
import { PoisonsService } from '../services/poisons.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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
    IonButtons,
    IonIcon,
  ],
})
export class Task4Page {
  isPhoneCharging = false;
  isPhoneChargingSlow = false;
  congratulationsMessage = '';
  failureMessage = '';
  notChargingMessage = '';
  chargingStartTime: number = 0;
  private scanStartTime: number = 0;
  private timeLimitForFastScan: number = 90000;
  slowChargingMessage: string = '';
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

    this.changeDetectorRef.detectChanges();

    const elapsedTime = Date.now() - this.chargingStartTime;
    const elapsedMinutes = elapsedTime / (1000 * 60);
    if (!this.isPhoneCharging && elapsedMinutes > 1) {
      this.isPhoneChargingSlow = true;
      this.showfailureMessage();
    }
    this.changeDetectorRef.detectChanges();
  }

  async showChargingMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    this.congratulationsMessage = `You connected your phone, great!
Here's your candy 🍭
You've collected ${lollipopsCollected} lollipop(s) so far.`;
    await Haptics.impact({ style: ImpactStyle.Medium });
    this.lollipopService.collectLollipop();
  }

  async showfailureMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    const poisonsCollected = this.poisonsService.getPoisonsCount();
    this.failureMessage = `You took too long to charge your phone and risked a low battery.
    Here's your poison🧪 and your candy 🍭
    You've collected ${poisonsCollected} poisons and ${lollipopsCollected} lollipop(s) so far.`;
    await Haptics.impact({ style: ImpactStyle.Medium });
    this.lollipopService.collectLollipop();
    this.poisonsService.collectPoison();
  }
  showNotChargingMessage() {
    this.notChargingMessage = 'Charge your phone';
  }
  goToFinalPage() {
    this.router.navigate(['final-page']);
  }
  cancelTask() {
    this.router.navigate(['']);
  }
}
