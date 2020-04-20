import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitscategoryPage } from './activitscategory.page';

describe('ActivitscategoryPage', () => {
  let component: ActivitscategoryPage;
  let fixture: ComponentFixture<ActivitscategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitscategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitscategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
