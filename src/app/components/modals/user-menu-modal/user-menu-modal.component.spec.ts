import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuModalComponent } from './user-menu-modal.component';

describe('UserMenuModalComponent', () => {
  let component: UserMenuModalComponent;
  let fixture: ComponentFixture<UserMenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
