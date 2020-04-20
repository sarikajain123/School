import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkviewPage } from './markview.page';

describe('MarkviewPage', () => {
  let component: MarkviewPage;
  let fixture: ComponentFixture<MarkviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
