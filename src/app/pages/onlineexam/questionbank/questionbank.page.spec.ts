import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbankPage } from './questionbank.page';

describe('QuestionbankPage', () => {
  let component: QuestionbankPage;
  let fixture: ComponentFixture<QuestionbankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionbankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionbankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
