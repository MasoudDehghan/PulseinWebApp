import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForOffersComponent } from './wait-for-offers.component';

describe('WaitForOffersComponent', () => {
  let component: WaitForOffersComponent;
  let fixture: ComponentFixture<WaitForOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
