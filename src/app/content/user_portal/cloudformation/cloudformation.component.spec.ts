import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudFormationComponent } from './cloudformation.component';

describe('CloudFormationComponent', () => {
  let component: CloudFormationComponent;
  let fixture: ComponentFixture<CloudFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
