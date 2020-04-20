import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmemberviewPage } from './hmemberview.page';

describe('HmemberviewPage', () => {
  let component: HmemberviewPage;
  let fixture: ComponentFixture<HmemberviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmemberviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmemberviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
