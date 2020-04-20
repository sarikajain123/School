import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetcategoryPage } from './assetcategory.page';

describe('AssetcategoryPage', () => {
  let component: AssetcategoryPage;
  let fixture: ComponentFixture<AssetcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
