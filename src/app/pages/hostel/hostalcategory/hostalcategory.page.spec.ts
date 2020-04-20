import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostalcategoryPage } from './hostalcategory.page';

describe('HostalcategoryPage', () => {
  let component: HostalcategoryPage;
  let fixture: ComponentFixture<HostalcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostalcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostalcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
