import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamschedulePage } from './examschedule.page';

describe('ExamschedulePage', () => {
  let component: ExamschedulePage;
  let fixture: ComponentFixture<ExamschedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamschedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
