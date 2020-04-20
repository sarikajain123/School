import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SattendanceaddPage } from './sattendanceadd.page';

describe('SattendanceaddPage', () => {
  let component: SattendanceaddPage;
  let fixture: ComponentFixture<SattendanceaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SattendanceaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SattendanceaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
