import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCategoriesComponent } from './discount-categories.component';

describe('DiscountCategoriesComponent', () => {
  let component: DiscountCategoriesComponent;
  let fixture: ComponentFixture<DiscountCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
