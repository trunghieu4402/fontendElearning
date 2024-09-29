/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddSemesterGroupComponent } from './AddSemesterGroup.component';

describe('AddSemesterGroupComponent', () => {
  let component: AddSemesterGroupComponent;
  let fixture: ComponentFixture<AddSemesterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSemesterGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSemesterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
