import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TattendancePage } from './tattendance.page';

describe('TattendancePage', () => {
  let component: TattendancePage;
  let fixture: ComponentFixture<TattendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TattendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TattendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
