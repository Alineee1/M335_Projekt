import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LollipopService {
  lollipopsCollected = 0;

  getLollipopsCount(): number {
    return this.lollipopsCollected;
  }

  collectLollipop(): void {
    this.lollipopsCollected += 1;
  }
}
