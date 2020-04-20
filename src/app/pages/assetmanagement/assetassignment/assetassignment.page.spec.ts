import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetassignmentPage } from './assetassignment.page';

describe('AssetassignmentPage', () => {
  let component: AssetassignmentPage;
  let fixture: ComponentFixture<AssetassignmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetassignmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetassignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
