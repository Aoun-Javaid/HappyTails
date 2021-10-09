import { TestBed } from '@angular/core/testing';

import { ReuseFunctionService } from './reuse-function.service';

describe('ReuseFunctionService', () => {
  let service: ReuseFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReuseFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
