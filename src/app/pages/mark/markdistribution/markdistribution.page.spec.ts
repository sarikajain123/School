import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdistributionPage } from './markdistribution.page';

describe('MarkdistributionPage', () => {
  let component: MarkdistributionPage;
  let fixture: ComponentFixture<MarkdistributionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdistributionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdistributionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
