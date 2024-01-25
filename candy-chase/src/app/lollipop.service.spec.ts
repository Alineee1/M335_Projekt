import { TestBed } from '@angular/core/testing';

import { LollipopService } from './lollipop.service';

describe('LollipopService', () => {
  let service: LollipopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LollipopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
