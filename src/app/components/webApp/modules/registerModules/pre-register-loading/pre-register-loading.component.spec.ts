import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegisterLoadingComponent } from './pre-register-loading.component';

describe('PreRegisterLoadingComponent', () => {
  let component: PreRegisterLoadingComponent;
  let fixture: ComponentFixture<PreRegisterLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRegisterLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRegisterLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
