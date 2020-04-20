import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaillsmsviewPage } from './maillsmsview.page';

describe('MaillsmsviewPage', () => {
  let component: MaillsmsviewPage;
  let fixture: ComponentFixture<MaillsmsviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaillsmsviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaillsmsviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
