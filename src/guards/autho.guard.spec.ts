import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authoGuard } from './autho.guard';

describe('authoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
