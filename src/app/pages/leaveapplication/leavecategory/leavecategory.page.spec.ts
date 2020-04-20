import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavecategoryPage } from './leavecategory.page';

describe('LeavecategoryPage', () => {
  let component: LeavecategoryPage;
  let fixture: ComponentFixture<LeavecategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavecategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavecategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
