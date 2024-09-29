/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCourseSemesterComponent } from './AddCourseSemester.component';

describe('AddCourseSemesterComponent', () => {
  let component: AddCourseSemesterComponent;
  let fixture: ComponentFixture<AddCourseSemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseSemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
