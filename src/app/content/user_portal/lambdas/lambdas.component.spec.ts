import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LambdasComponent } from './lambdas.component';

describe('LambdasComponent', () => {
  let component: LambdasComponent;
  let fixture: ComponentFixture<LambdasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LambdasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LambdasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
