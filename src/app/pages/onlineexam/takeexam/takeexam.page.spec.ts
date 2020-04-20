import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeexamPage } from './takeexam.page';

describe('TakeexamPage', () => {
  let component: TakeexamPage;
  let fixture: ComponentFixture<TakeexamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeexamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
