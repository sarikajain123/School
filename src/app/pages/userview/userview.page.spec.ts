import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewPage } from './userview.page';

describe('UserviewPage', () => {
  let component: UserviewPage;
  let fixture: ComponentFixture<UserviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
