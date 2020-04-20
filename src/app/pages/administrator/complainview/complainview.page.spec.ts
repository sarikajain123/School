import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainviewPage } from './complainview.page';

describe('ComplainviewPage', () => {
  let component: ComplainviewPage;
  let fixture: ComponentFixture<ComplainviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
