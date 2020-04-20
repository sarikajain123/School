import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatetemplateviewPage } from './certificatetemplateview.page';

describe('CertificatetemplateviewPage', () => {
  let component: CertificatetemplateviewPage;
  let fixture: ComponentFixture<CertificatetemplateviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatetemplateviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatetemplateviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
