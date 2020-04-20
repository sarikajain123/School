import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcategoriePage } from './postcategorie.page';

describe('PostcategoriePage', () => {
  let component: PostcategoriePage;
  let fixture: ComponentFixture<PostcategoriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcategoriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
