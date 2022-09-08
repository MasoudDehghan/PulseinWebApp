import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfavorComponent } from './jobfavor.component';

describe('JobfavorComponent', () => {
  let component: JobfavorComponent;
  let fixture: ComponentFixture<JobfavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobfavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobfavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
