import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraDescriptionComponent } from './extra-description.component';

describe('ExtraDescriptionComponent', () => {
  let component: ExtraDescriptionComponent;
  let fixture: ComponentFixture<ExtraDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
