import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterIQbazComponent } from './footer-iqbaz.component';

describe('FooterIQbazComponent', () => {
  let component: FooterIQbazComponent;
  let fixture: ComponentFixture<FooterIQbazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterIQbazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterIQbazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
