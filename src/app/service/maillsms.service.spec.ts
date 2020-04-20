import { TestBed } from '@angular/core/testing';

import { MaillsmsService } from './maillsms.service';

describe('MaillsmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaillsmsService = TestBed.get(MaillsmsService);
    expect(service).toBeTruthy();
  });
});
