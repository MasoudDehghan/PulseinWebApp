import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLoginItmeComponent } from './menu-login-itme.component';

describe('MenuLoginItmeComponent', () => {
  let component: MenuLoginItmeComponent;
  let fixture: ComponentFixture<MenuLoginItmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLoginItmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLoginItmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
