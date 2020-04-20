import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentviewPage } from './studentview.page';

describe('StudentviewPage', () => {
  let component: StudentviewPage;
  let fixture: ComponentFixture<StudentviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
