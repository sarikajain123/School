import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailandsmstemplateviewPage } from './mailandsmstemplateview.page';

describe('MailandsmstemplateviewPage', () => {
  let component: MailandsmstemplateviewPage;
  let fixture: ComponentFixture<MailandsmstemplateviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailandsmstemplateviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailandsmstemplateviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
