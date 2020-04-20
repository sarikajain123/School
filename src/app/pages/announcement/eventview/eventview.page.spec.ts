import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventviewPage } from './eventview.page';

describe('EventviewPage', () => {
  let component: EventviewPage;
  let fixture: ComponentFixture<EventviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
