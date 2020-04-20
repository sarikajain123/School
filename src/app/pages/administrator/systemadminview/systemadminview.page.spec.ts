import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemadminviewPage } from './systemadminview.page';

describe('SystemadminviewPage', () => {
  let component: SystemadminviewPage;
  let fixture: ComponentFixture<SystemadminviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemadminviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemadminviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
