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
  //isQRCodeCorrect = false;

  constructor(private router: Router) {}

  /*public status: string = 'incorrect';*/
  /*public scanned: boolean = false;*/

  startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    (document.querySelector('body') as HTMLElement).classList.add(
      'scanner-active',
    );
    await BarcodeScanner.hideBackground();

    /*const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    console.log('Image captured', image);*/

    try {
      const barcodeResult = await BarcodeScanner.startScan();
      if (barcodeResult.hasContent) {
        if (barcodeResult.content === 'M335@ICT-BZ') {
          //this.isQRCodeCorrect = true;
          /*this.scanned = true;*/
          console.log('Correct QR-Code', barcodeResult);
        } else {
          console.warn('Incorrect QR-Code', barcodeResult.content);
          //this.isQRCodeCorrect = false;
        }
      }
    } catch (error) {
      console.error('Error during barcode scanning', error);
    } finally {
      (document.querySelector('body') as HTMLElement).classList.remove(
        'scanner-active',
      );
    }
  };

  goToTaskFour() {
    //if (this.isQRCodeCorrect) {
    this.router.navigate(['task4']);
    //} else {
    //console.warn('QR-Code incorrect');
    //}
  }
}
