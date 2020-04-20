import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapplicationviewPage } from './leaveapplicationview.page';

describe('LeaveapplicationviewPage', () => {
  let component: LeaveapplicationviewPage;
  let fixture: ComponentFixture<LeaveapplicationviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveapplicationviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveapplicationviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
