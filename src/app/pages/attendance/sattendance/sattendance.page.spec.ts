import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SattendancePage } from './sattendance.page';

describe('SattendancePage', () => {
  let component: SattendancePage;
  let fixture: ComponentFixture<SattendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SattendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SattendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
