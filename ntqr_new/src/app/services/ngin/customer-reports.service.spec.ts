import { TestBed } from '@angular/core/testing';

import { CustomerReportsService } from './customer-reports.service';

describe('CustomerReportsService', () => {
  let service: CustomerReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
