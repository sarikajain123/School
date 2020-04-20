import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UattendanceaddPage } from './uattendanceadd.page';

describe('UattendanceaddPage', () => {
  let component: UattendanceaddPage;
  let fixture: ComponentFixture<UattendanceaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UattendanceaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UattendanceaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
