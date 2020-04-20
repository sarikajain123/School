import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesalaryPage } from './managesalary.page';

describe('ManagesalaryPage', () => {
  let component: ManagesalaryPage;
  let fixture: ComponentFixture<ManagesalaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesalaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
