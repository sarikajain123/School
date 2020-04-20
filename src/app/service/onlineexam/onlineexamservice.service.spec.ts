import { TestBed } from '@angular/core/testing';

import { OnlineexamserviceService } from './onlineexamservice.service';

describe('OnlineexamserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineexamserviceService = TestBed.get(OnlineexamserviceService);
    expect(service).toBeTruthy();
  });
});
