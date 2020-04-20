import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TattendanceviewPage } from './tattendanceview.page';

describe('TattendanceviewPage', () => {
  let component: TattendanceviewPage;
  let fixture: ComponentFixture<TattendanceviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TattendanceviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TattendanceviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
