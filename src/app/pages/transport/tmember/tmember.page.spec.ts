import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmemberPage } from './tmember.page';

describe('TmemberPage', () => {
  let component: TmemberPage;
  let fixture: ComponentFixture<TmemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
