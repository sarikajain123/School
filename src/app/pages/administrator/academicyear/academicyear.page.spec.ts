import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicyearPage } from './academicyear.page';

describe('AcademicyearPage', () => {
  let component: AcademicyearPage;
  let fixture: ComponentFixture<AcademicyearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicyearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicyearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
