import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetviewPage } from './assetview.page';

describe('AssetviewPage', () => {
  let component: AssetviewPage;
  let fixture: ComponentFixture<AssetviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
