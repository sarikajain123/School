import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineexamPage } from './onlineexam.page';

describe('OnlineexamPage', () => {
  let component: OnlineexamPage;
  let fixture: ComponentFixture<OnlineexamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineexamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
