import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaillsmsPage } from './maillsms.page';

describe('MaillsmsPage', () => {
  let component: MaillsmsPage;
  let fixture: ComponentFixture<MaillsmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaillsmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaillsmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
