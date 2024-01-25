import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.page.html',
  styleUrls: ['./task1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Task1Page {
  private watchId: string | null = null;
  public distanceToTarget: number | null = null;
  private targetLocation = {
    latitude: 47.071945403994924,
    longitude: 8.348885173299777,
  };

  constructor() {}
}
