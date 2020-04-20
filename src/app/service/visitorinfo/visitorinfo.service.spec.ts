import { TestBed } from '@angular/core/testing';

import { VisitorinfoService } from './visitorinfo.service';

describe('VisitorinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitorinfoService = TestBed.get(VisitorinfoService);
    expect(service).toBeTruthy();
  });
});
