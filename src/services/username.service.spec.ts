import { TestBed } from '@angular/core/testing';

import { UsernameService } from './username.service';

describe('UsernameServicesService', () => {
  let service: UsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
