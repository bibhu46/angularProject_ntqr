import { TestBed } from '@angular/core/testing';

import { NgindatadashboardService } from './ngindatadashboard.service';

describe('NgindatadashboardService', () => {
  let service: NgindatadashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgindatadashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
