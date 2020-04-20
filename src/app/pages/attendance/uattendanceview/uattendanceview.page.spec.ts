import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UattendanceviewPage } from './uattendanceview.page';

describe('UattendanceviewPage', () => {
  let component: UattendanceviewPage;
  let fixture: ComponentFixture<UattendanceviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UattendanceviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UattendanceviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
