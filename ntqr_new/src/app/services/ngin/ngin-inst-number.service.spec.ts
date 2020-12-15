import { TestBed } from '@angular/core/testing';

import { NginInstNumberService } from './ngin-inst-number.service';

describe('NginInstNumberService', () => {
  let service: NginInstNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NginInstNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
