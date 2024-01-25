import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonAlert,
  IonText,
  AlertController,
} from '@ionic/angular/standalone';
import { Router, NavigationExtras } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
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
export class WelcomePage {
  router: Router = inject(Router);
  alertController: AlertController = inject(AlertController);

  public alertButtons = [
    {
      text: 'NEXT',
      /*handler: (alertData): void => {
        // Explicitly marking return type as void
        const userName = alertData.Name;
        if (!userName || userName.trim() === '') {
          this.presentAlert();
          return; // Explicitly return, which is equivalent to returning 'undefined'
        } else {
          this.router.navigate(['instructions']);
          return;
        }
      },*/
      handler: () => {
        this.router.navigate(['instructions']);
      },
    },
  ];

  public alertInputs = [
    {
      name: 'Name', // Ensure to add a 'name' attribute for the input
      placeholder: 'Name',
      type: 'text',
    },
  ];

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Type in your name in order to continue',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
