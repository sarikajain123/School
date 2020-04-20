import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayviewPage } from './holidayview.page';

describe('HolidayviewPage', () => {
  let component: HolidayviewPage;
  let fixture: ComponentFixture<HolidayviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
