import { TestBed } from '@angular/core/testing';

import { GlobalHttpInterceptorServiceService } from './global-http-interceptor-service.service';

describe('GlobalHttpInterceptorServiceService', () => {
  let service: GlobalHttpInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalHttpInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
