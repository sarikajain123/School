import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleviewPage } from './saleview.page';

describe('SaleviewPage', () => {
  let component: SaleviewPage;
  let fixture: ComponentFixture<SaleviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
