import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class PoisonsService {
  private storageKey = 'poisonsCollected';
  poisonsCollected: number = 0;

  constructor(private localStorageService: LocalstorageService) {
    // Load data from local storage on service initialization
    this.loadFromLocalStorage();
  }

  getPoisonsCount(): number {
    return this.poisonsCollected || 0;
  }

  collectPoison(): void {
    this.poisonsCollected += 1;
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedValue = this.localStorageService.getItem(this.storageKey);
    this.poisonsCollected = storedValue
      ? parseInt(storedValue as string, 10)
      : 0;
  }

  private saveToLocalStorage(): void {
    this.localStorageService.setItem(
      this.storageKey,
      this.poisonsCollected.toString(),
    );
  }
}
