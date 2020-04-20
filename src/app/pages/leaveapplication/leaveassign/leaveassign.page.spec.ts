import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveassignPage } from './leaveassign.page';

describe('LeaveassignPage', () => {
  let component: LeaveassignPage;
  let fixture: ComponentFixture<LeaveassignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveassignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveassignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
