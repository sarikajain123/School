import { TestBed } from '@angular/core/testing';

import { RoutionService } from './roution.service';

describe('RoutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutionService = TestBed.get(RoutionService);
    expect(service).toBeTruthy();
  });
});
