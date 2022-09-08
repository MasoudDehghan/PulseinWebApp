import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCatMenuComponent } from './job-cat-menu.component';

describe('JobCatMenuComponent', () => {
  let component: JobCatMenuComponent;
  let fixture: ComponentFixture<JobCatMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCatMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
