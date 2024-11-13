import { TestBed } from '@angular/core/testing';

import { CategeryServiceService } from './categery-service.service';

describe('CategeryServiceService', () => {
  let service: CategeryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategeryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
