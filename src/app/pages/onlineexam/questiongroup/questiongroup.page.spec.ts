import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiongroupPage } from './questiongroup.page';

describe('QuestiongroupPage', () => {
  let component: QuestiongroupPage;
  let fixture: ComponentFixture<QuestiongroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestiongroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestiongroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
