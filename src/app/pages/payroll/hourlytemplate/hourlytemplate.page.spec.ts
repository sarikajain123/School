import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlytemplatePage } from './hourlytemplate.page';

describe('HourlytemplatePage', () => {
  let component: HourlytemplatePage;
  let fixture: ComponentFixture<HourlytemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlytemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlytemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
