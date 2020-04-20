import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TattendanceaddPage } from './tattendanceadd.page';

describe('TattendanceaddPage', () => {
  let component: TattendanceaddPage;
  let fixture: ComponentFixture<TattendanceaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TattendanceaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TattendanceaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
