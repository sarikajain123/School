import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatetemplatePage } from './certificatetemplate.page';

describe('CertificatetemplatePage', () => {
  let component: CertificatetemplatePage;
  let fixture: ComponentFixture<CertificatetemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatetemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatetemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
