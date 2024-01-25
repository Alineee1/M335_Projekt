import {Component, inject} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonAlert, IonText, IonButtons, IonBackButton, IonIcon, IonRouterLink
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem, IonButton, IonAlert, IonText, IonButtons, IonBackButton, IonIcon, IonRouterLink]
})
export class InstructionsPage {

  constructor(private router: Router) { }
  goToCameraAccess(){

    this.router.navigate(['camera-access'])
  }
}


