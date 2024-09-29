/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MajorComponent } from './Major.component';

describe('MajorComponent', () => {
  let component: MajorComponent;
  let fixture: ComponentFixture<MajorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
