import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class LollipopService {
  private storageKey = 'lollipopsCollected';
  lollipopsCollected: number = 0;

  constructor(private localStorageService: LocalstorageService) {
    // Load data from local storage on service initialization
    this.loadFromLocalStorage();
  }

  getLollipopsCount(): number {
    return this.lollipopsCollected || 0;
  }

  collectLollipop(): void {
    this.lollipopsCollected += 1;
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedValue = this.localStorageService.getItem(this.storageKey);
    this.lollipopsCollected = storedValue
      ? parseInt(storedValue as string, 10)
      : 0;
  }

  private saveToLocalStorage(): void {
    this.localStorageService.setItem(
      this.storageKey,
      this.lollipopsCollected.toString(),
    );
  }
}
