import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJobcat3Component } from './select-jobcat3.component';

describe('SelectJobcat3Component', () => {
  let component: SelectJobcat3Component;
  let fixture: ComponentFixture<SelectJobcat3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectJobcat3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectJobcat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
