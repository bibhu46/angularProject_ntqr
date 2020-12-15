import { TestBed } from '@angular/core/testing';

import { ServiceKeyService } from './service-key.service';

describe('ServiceKeyService', () => {
  let service: ServiceKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
