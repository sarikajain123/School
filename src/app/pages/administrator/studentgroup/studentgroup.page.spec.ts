import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentgroupPage } from './studentgroup.page';

describe('StudentgroupPage', () => {
  let component: StudentgroupPage;
  let fixture: ComponentFixture<StudentgroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentgroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
