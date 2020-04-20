import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionlevelPage } from './questionlevel.page';

describe('QuestionlevelPage', () => {
  let component: QuestionlevelPage;
  let fixture: ComponentFixture<QuestionlevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionlevelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionlevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
