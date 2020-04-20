import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsviewPage } from './parentsview.page';

describe('ParentsviewPage', () => {
  let component: ParentsviewPage;
  let fixture: ComponentFixture<ParentsviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
