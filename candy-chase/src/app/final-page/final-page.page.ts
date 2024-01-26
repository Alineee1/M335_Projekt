import { Component, OnInit } from '@angular/core';
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

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.page.html',
  styleUrls: ['./final-page.page.scss'],
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
export class FinalPagePage implements OnInit {
  collectedCandy: number = 0;
  encounteredPoison: number = 0;
  userRank: number = 0;
  elapsedTime: number = 0;
  constructor(private dataService: DataService) {}
  ngOnInit() {
    const overallData = this.dataService.getOverallData();
    this.collectedCandy = overallData.lollipops;
    this.encounteredPoison = overallData.poisons;
    this.userRank = overallData.userRank;
    this.elapsedTime = overallData.elapsedTime;
  }
}
