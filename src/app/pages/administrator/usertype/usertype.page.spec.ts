import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypePage } from './usertype.page';

describe('UsertypePage', () => {
  let component: UsertypePage;
  let fixture: ComponentFixture<UsertypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
