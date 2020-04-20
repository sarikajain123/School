import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelPage } from './hostel.page';

describe('HostelPage', () => {
  let component: HostelPage;
  let fixture: ComponentFixture<HostelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
