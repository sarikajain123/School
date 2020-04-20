import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailandsmstemplatePage } from './mailandsmstemplate.page';

describe('MailandsmstemplatePage', () => {
  let component: MailandsmstemplatePage;
  let fixture: ComponentFixture<MailandsmstemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailandsmstemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailandsmstemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
