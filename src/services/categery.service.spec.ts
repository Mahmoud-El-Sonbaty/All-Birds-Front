import { TestBed } from '@angular/core/testing';

import { CategeryService } from './categery.service';

describe('CategeryService', () => {
  let service: CategeryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategeryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
