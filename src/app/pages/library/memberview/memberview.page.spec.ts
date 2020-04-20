import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberviewPage } from './memberview.page';

describe('MemberviewPage', () => {
  let component: MemberviewPage;
  let fixture: ComponentFixture<MemberviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
