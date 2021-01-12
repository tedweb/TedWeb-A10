import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwAngularNavComponent } from './tw-angular-nav.component';
import { TwAngularNavitemComponent } from './tw-angular-navitem/tw-angular-navitem.component';

describe('TwAngularNavComponent', () => {
  let component: TwAngularNavComponent;
  let fixture: ComponentFixture<TwAngularNavComponent>;
  //let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TwAngularNavComponent,
        TwAngularNavitemComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwAngularNavComponent);
    component = fixture.componentInstance;
    //element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//  it('should create', () => {

    // // * arrange
    // const title = 'Hey there, i hope you are enjoying this article';
    // const titleElement = element.querySelector('.header-title');
    // // * act
    // component.title = title;
    // fixture.detectChanges(); 
    // // * assert
    // expect(titleElement.textContent).toContain(title);
//  });
  
});
