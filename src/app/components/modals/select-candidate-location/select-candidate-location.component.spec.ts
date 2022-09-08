import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCandidateLocationComponent } from './select-candidate-location.component';

describe('SelectCandidateLocationComponent', () => {
  let component: SelectCandidateLocationComponent;
  let fixture: ComponentFixture<SelectCandidateLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCandidateLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCandidateLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
