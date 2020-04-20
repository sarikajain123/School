import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbankviewPage } from './questionbankview.page';

describe('QuestionbankviewPage', () => {
  let component: QuestionbankviewPage;
  let fixture: ComponentFixture<QuestionbankviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionbankviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionbankviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
