import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildecarePage } from './childecare.page';

describe('ChildecarePage', () => {
  let component: ChildecarePage;
  let fixture: ComponentFixture<ChildecarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildecarePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildecarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
