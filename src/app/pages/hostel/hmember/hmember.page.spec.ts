import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmemberPage } from './hmember.page';

describe('HmemberPage', () => {
  let component: HmemberPage;
  let fixture: ComponentFixture<HmemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
