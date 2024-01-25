import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonAlert, IonText, IonCard, IonCardContent
} from '@ionic/angular/standalone';
import {ExploreContainerComponent} from "../explore-container/explore-container.component";
import {Camera, CameraResultType, Photo} from "@capacitor/camera";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonButton, IonAlert, IonText, IonCard, IonCardContent, NgIf]
})
export class QrCodePage {
  imageUrl?: string

  async takePicture(){
    const image :Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.imageUrl = image.webPath
  }
}
