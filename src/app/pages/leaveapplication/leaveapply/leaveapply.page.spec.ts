import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapplyPage } from './leaveapply.page';

describe('LeaveapplyPage', () => {
  let component: LeaveapplyPage;
  let fixture: ComponentFixture<LeaveapplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveapplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
