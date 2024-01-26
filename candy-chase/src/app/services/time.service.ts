import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private startTime: number | null = null;
  private elapsedTime: number = 0;
  private storageKey = 'elapsedTime';

  constructor() {
    // Load data from local storage on service initialization
    this.loadFromLocalStorage();
  }

  startTimer(): void {
    this.startTime = new Date().getTime();
  }

  stopTimer(): void {
    if (this.startTime) {
      const endTime = new Date().getTime();
      this.elapsedTime += endTime - this.startTime;
      this.startTime = null; // Reset the start time
      this.saveToLocalStorage();
    }
  }

  getElapsedTime(): number {
    return this.elapsedTime;
  }

  private loadFromLocalStorage(): void {
    const storedValue = localStorage.getItem(this.storageKey);
    this.elapsedTime = storedValue ? parseInt(storedValue, 10) : 0;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, this.elapsedTime.toString());
  }
}
