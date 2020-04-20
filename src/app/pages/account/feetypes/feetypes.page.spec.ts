import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeetypesPage } from './feetypes.page';

describe('FeetypesPage', () => {
  let component: FeetypesPage;
  let fixture: ComponentFixture<FeetypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeetypesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeetypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
