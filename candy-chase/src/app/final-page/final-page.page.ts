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
import { LollipopService } from '../lollipop.service';
import { PoisonsService } from '../poisons.service';

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
  constructor(
    private lollipopService: LollipopService,
    private poisonsService: PoisonsService,
  ) {}

  ngOnInit() {
    this.collectedCandy = this.lollipopService.getLollipopsCount();
    this.encounteredPoison = this.poisonsService.getPoisonsCount();
  }
}
