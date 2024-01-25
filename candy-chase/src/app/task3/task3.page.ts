import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

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
  ],
})
export class Task3Page {
  constructor(private router: Router) {}

  public status: string = 'incorrect';
  startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    await BarcodeScanner.hideBackground();

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    console.log('Image captured', image);

    try {
      const barcodeResult = await BarcodeScanner.startScan();
      if (barcodeResult.hasContent) {
        if (barcodeResult.content === 'M335@ICT-BZ') {
          this.status = 'correct';
          console.log('Correct QR-Code', barcodeResult);
        }
      }
    } catch {}
  };

  goToTaskFour() {
    this.router.navigate(['task4']);
  }
}
