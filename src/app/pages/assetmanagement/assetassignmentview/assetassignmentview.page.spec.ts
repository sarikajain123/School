import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetassignmentviewPage } from './assetassignmentview.page';

describe('AssetassignmentviewPage', () => {
  let component: AssetassignmentviewPage;
  let fixture: ComponentFixture<AssetassignmentviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetassignmentviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetassignmentviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
