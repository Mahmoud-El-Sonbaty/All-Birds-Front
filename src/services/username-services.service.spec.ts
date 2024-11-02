import { TestBed } from '@angular/core/testing';

import { UsernameServicesService } from './username-services.service';

describe('UsernameServicesService', () => {
  let service: UsernameServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
