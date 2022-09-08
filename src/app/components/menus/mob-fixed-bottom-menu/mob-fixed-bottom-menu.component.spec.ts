import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobFixedBottomMenuComponent } from './mob-fixed-bottom-menu.component';

describe('MobFixedBottomMenuComponent', () => {
  let component: MobFixedBottomMenuComponent;
  let fixture: ComponentFixture<MobFixedBottomMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobFixedBottomMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobFixedBottomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
