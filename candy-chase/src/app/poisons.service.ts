import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PoisonsService {
  poisonsCollected = 0;

  getPoisonsCount(): number {
    return this.poisonsCollected;
  }

  collectPoison(): void {
    this.poisonsCollected += 1;
  }
}
