import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocillinkPage } from './socillink.page';

describe('SocillinkPage', () => {
  let component: SocillinkPage;
  let fixture: ComponentFixture<SocillinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocillinkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocillinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
