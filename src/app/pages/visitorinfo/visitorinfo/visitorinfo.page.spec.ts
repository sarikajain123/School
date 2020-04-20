import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorinfoPage } from './visitorinfo.page';

describe('VisitorinfoPage', () => {
  let component: VisitorinfoPage;
  let fixture: ComponentFixture<VisitorinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
