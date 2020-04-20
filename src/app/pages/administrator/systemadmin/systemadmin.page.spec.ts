import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemadminPage } from './systemadmin.page';

describe('SystemadminPage', () => {
  let component: SystemadminPage;
  let fixture: ComponentFixture<SystemadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
