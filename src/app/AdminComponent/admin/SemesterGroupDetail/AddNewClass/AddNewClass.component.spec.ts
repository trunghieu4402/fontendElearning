/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddNewClassComponent } from './AddNewClass.component';

describe('AddNewClassComponent', () => {
  let component: AddNewClassComponent;
  let fixture: ComponentFixture<AddNewClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewClassComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
