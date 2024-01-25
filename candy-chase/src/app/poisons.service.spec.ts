import { TestBed } from '@angular/core/testing';

import { PoisonsService } from './poisons.service';

describe('PoisonsService', () => {
  let service: PoisonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoisonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
