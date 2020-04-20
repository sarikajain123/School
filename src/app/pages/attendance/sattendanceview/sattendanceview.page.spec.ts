import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SattendanceviewPage } from './sattendanceview.page';

describe('SattendanceviewPage', () => {
  let component: SattendanceviewPage;
  let fixture: ComponentFixture<SattendanceviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SattendanceviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SattendanceviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
