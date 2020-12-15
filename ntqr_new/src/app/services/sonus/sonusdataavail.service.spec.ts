import { TestBed } from '@angular/core/testing';

import { SonusdataavailService } from './sonusdataavail.service';

describe('SonusdataavailService', () => {
  let service: SonusdataavailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonusdataavailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
