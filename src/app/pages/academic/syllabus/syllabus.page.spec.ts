import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusPage } from './syllabus.page';

describe('SyllabusPage', () => {
  let component: SyllabusPage;
  let fixture: ComponentFixture<SyllabusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllabusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
