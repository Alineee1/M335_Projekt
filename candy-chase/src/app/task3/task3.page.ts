import { ChangeDetectorRef, Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LollipopService } from '../services/lollipop.service';
import { PoisonsService } from '../services/poisons.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.page.html',
  styleUrls: ['./task3.page.scss'],
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
    NgIf,
    IonButtons,
    IonIcon,
  ],
})
export class Task3Page {
  private scanStartTime: number = 0;
  private timeLimitForFastScan: number = 90000;
  public congratulationsMessage = '';
  public failureMessage = '';
  isQRCodeCorrect = false;

  constructor(
    private router: Router,
    private lollipopService: LollipopService,
    private poisonsService: PoisonsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  /*public status: string = 'incorrect';*/
  /*public scanned: boolean = false;*/

  startScan = async () => {
    this.scanStartTime = Date.now();
    await BarcodeScanner.checkPermission({ force: true });
    (document.querySelector('body') as HTMLElement).classList.add(
      'scanner-active',
    );
    await BarcodeScanner.hideBackground();

    try {
      const barcodeResult = await BarcodeScanner.startScan();
      if (barcodeResult.hasContent) {
        /*TIMER*/
        const elapsedTime = Date.now() - this.scanStartTime;
        localStorage.setItem('qrScanTime', elapsedTime.toString());

        if (barcodeResult.content === 'M335@ICT-BZ') {
          console.log('Correct QR-Code', barcodeResult);
          this.isQRCodeCorrect = true;
          if (elapsedTime <= this.timeLimitForFastScan) {
            this.showSuccessMessage();
          } else this.showFailureMessage();
        } else {
          console.warn('Incorrect QR-Code', barcodeResult.content);
          this.isQRCodeCorrect = false;
        }
      }
    } catch (error) {
      console.error('Error during barcode scanning', error);
    } finally {
      (document.querySelector('body') as HTMLElement).classList.remove(
        'scanner-active',
      );
    }
    this.changeDetectorRef.detectChanges();
  };

  goToTaskFour() {
    if (this.isQRCodeCorrect) {
      this.router.navigate(['task4']);
    } else {
      console.warn('QR-Code incorrect');
    }
  }

  async showSuccessMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    this.congratulationsMessage = `Wow, you found the right QR-Code!
Here's your candy 🍭
You've collected ${lollipopsCollected} lollipop(s) so far.`;
    await Haptics.impact({ style: ImpactStyle.Medium });
    this.lollipopService.collectLollipop();
  }

  async showFailureMessage() {
    const lollipopsCollected = this.lollipopService.getLollipopsCount();
    const poisonsCollected = this.poisonsService.getPoisonsCount();
    this.failureMessage = `After all you found the QR-Code, next time be a little faster!
Here's your poison🧪and your candy 🍭
You've collected ${poisonsCollected} poisons and ${lollipopsCollected} lollipop(s) so far.`;
    await Haptics.impact({ style: ImpactStyle.Medium });
    this.poisonsService.collectPoison();
    this.lollipopService.collectLollipop();
  }
  cancelTask() {
    this.router.navigate(['']);
  }
}
