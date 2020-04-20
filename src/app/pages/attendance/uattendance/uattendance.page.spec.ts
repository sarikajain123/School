import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UattendancePage } from './uattendance.page';

describe('UattendancePage', () => {
  let component: UattendancePage;
  let fixture: ComponentFixture<UattendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UattendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UattendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
