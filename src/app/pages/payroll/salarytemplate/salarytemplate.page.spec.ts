import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarytemplatePage } from './salarytemplate.page';

describe('SalarytemplatePage', () => {
  let component: SalarytemplatePage;
  let fixture: ComponentFixture<SalarytemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarytemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarytemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
