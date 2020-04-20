import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeviewPage } from './noticeview.page';

describe('NoticeviewPage', () => {
  let component: NoticeviewPage;
  let fixture: ComponentFixture<NoticeviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
