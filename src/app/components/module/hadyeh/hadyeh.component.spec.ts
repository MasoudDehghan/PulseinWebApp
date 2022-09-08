import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadyehComponent } from './hadyeh.component';

describe('HadyehComponent', () => {
  let component: HadyehComponent;
  let fixture: ComponentFixture<HadyehComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadyehComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadyehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
