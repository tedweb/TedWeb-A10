import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwAngularNavitemComponent } from './tw-angular-navitem.component';

describe('TwAngularNavitemComponent', () => {
  let component: TwAngularNavitemComponent;
  let fixture: ComponentFixture<TwAngularNavitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TwAngularNavitemComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwAngularNavitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
