import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFirebaseNotificationComponent } from './check-firebase-notification.component';

describe('CheckFirebaseNotificationComponent', () => {
  let component: CheckFirebaseNotificationComponent;
  let fixture: ComponentFixture<CheckFirebaseNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckFirebaseNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFirebaseNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
