import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceviewPage } from './invoiceview.page';

describe('InvoiceviewPage', () => {
  let component: InvoiceviewPage;
  let fixture: ComponentFixture<InvoiceviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
