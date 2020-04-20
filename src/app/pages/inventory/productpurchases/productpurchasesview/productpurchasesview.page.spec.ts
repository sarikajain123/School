import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpurchasesviewPage } from './productpurchasesview.page';

describe('ProductpurchasesviewPage', () => {
  let component: ProductpurchasesviewPage;
  let fixture: ComponentFixture<ProductpurchasesviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductpurchasesviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpurchasesviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
