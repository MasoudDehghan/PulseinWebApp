import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cat1cat2Component } from './cat1cat2.component';

describe('Cat1cat2Component', () => {
  let component: Cat1cat2Component;
  let fixture: ComponentFixture<Cat1cat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cat1cat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cat1cat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
