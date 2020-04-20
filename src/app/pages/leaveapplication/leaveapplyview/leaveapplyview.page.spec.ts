import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapplyviewPage } from './leaveapplyview.page';

describe('LeaveapplyviewPage', () => {
  let component: LeaveapplyviewPage;
  let fixture: ComponentFixture<LeaveapplyviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveapplyviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapplyviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
