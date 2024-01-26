import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  private storageKey = 'userRank';
  userRank: number = 0;
  private bestTimeKey = 'bestTime';
  private mostLollipopsKey = 'mostLollipops';

  constructor(private localStorageService: LocalstorageService) {
    // Load data from local storage on service initialization
    this.loadFromLocalStorage();
  }

  getUserRank(): number {
    return this.userRank || 0;
  }

  setUserRank(newRank: number): void {
    this.userRank = newRank;
    this.saveToLocalStorage();
  }

  getBestTime(): number | null {
    return this.localStorageService.getItem<number>(this.bestTimeKey);
  }

  setBestTime(time: number): void {
    const currentBestTime = this.getBestTime();
    if (currentBestTime === null || time < currentBestTime) {
      this.localStorageService.setItem(this.bestTimeKey, time);
    }
  }

  getMostLollipops(): number | null {
    return this.localStorageService.getItem<number>(this.mostLollipopsKey);
  }

  setMostLollipops(count: number): void {
    const currentMostLollipops = this.getMostLollipops();
    if (currentMostLollipops === null || count > currentMostLollipops) {
      this.localStorageService.setItem(this.mostLollipopsKey, count);
    }
  }

  calculateUserRank(collectedCandy: number, time: number): void {
    // Assuming a simple formula where lower time and more candies result in a better rank
    const timeWeight = 0.5; // Adjust the weight according to your preference
    const candyWeight = 0.5; // Adjust the weight according to your preference

    // Calculate a score based on time and collected candies
    const score = time * timeWeight + collectedCandy * candyWeight;

    // Assign the rank based on the score (lower score is better)
    if (score < 50) {
      this.userRank = 1; // Best rank
    } else if (score < 100) {
      this.userRank = 2;
    } else {
      this.userRank = 3; // Worst rank
    }

    this.setBestTime(time); // Update the best time if the current time is better
    this.setMostLollipops(collectedCandy); // Update the most lollipops if the current count is higher

    this.saveToLocalStorage(); // Save the updated rank to local storage
  }

  private loadFromLocalStorage(): void {
    const storedValue = this.localStorageService.getItem(this.storageKey);
    this.userRank =
      storedValue !== null ? parseInt(storedValue as string, 10) : 0;
  }

  private saveToLocalStorage(): void {
    this.localStorageService.setItem(this.storageKey, this.userRank.toString());
  }
}
