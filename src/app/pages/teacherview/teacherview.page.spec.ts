import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherviewPage } from './teacherview.page';

describe('TeacherviewPage', () => {
  let component: TeacherviewPage;
  let fixture: ComponentFixture<TeacherviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
