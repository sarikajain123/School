import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapplicationPage } from './leaveapplication.page';

describe('LeaveapplicationPage', () => {
  let component: LeaveapplicationPage;
  let fixture: ComponentFixture<LeaveapplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveapplicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
