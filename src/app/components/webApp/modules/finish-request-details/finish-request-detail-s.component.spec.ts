import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRequestDetailsComponent } from './finish-request-details.component';

describe('FinishRequestDetailSComponent', () => {
  let component: FinishRequestDetailsComponent;
  let fixture: ComponentFixture<FinishRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
