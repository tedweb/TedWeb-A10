import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionRegistryComponent } from './conditionRegistry.component';

describe('ConditionRegistryComponent', () => {
  let component: ConditionRegistryComponent;
  let fixture: ComponentFixture<ConditionRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
