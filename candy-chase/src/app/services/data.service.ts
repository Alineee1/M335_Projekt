import { Injectable } from '@angular/core';
import { LollipopService } from './lollipop.service';
import { PoisonsService } from './poisons.service';
import { RankService } from './rank.service';
import { TimeService } from './time.service';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Manages overall application data
  constructor(
    private lollipopService: LollipopService,
    private poisonsService: PoisonsService,
    private rankService: RankService,
    private timeService: TimeService,
  ) {}
  getOverallData(): {
    lollipops: number;
    poisons: number;
    userRank: number;
    elapsedTime: number;
  } {
    return {
      lollipops: this.lollipopService.getLollipopsCount(),
      poisons: this.poisonsService.getPoisonsCount(),
      userRank: this.rankService.getUserRank(),
      elapsedTime: this.timeService.getElapsedTime(),
    };
  }
}
