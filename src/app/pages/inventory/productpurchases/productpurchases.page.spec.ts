import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpurchasesPage } from './productpurchases.page';

describe('ProductpurchasesPage', () => {
  let component: ProductpurchasesPage;
  let fixture: ComponentFixture<ProductpurchasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductpurchasesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpurchasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
