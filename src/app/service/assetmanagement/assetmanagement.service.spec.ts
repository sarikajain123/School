import { TestBed } from '@angular/core/testing';

import { AssetmanagementService } from './assetmanagement.service';

describe('AssetmanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetmanagementService = TestBed.get(AssetmanagementService);
    expect(service).toBeTruthy();
  });
});
