import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionviewPage } from './instructionview.page';

describe('InstructionviewPage', () => {
  let component: InstructionviewPage;
  let fixture: ComponentFixture<InstructionviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
