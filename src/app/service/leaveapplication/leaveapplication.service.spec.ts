import { TestBed } from '@angular/core/testing';

import { LeaveapplicationService } from './leaveapplication.service';

describe('LeaveapplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveapplicationService = TestBed.get(LeaveapplicationService);
    expect(service).toBeTruthy();
  });
});
