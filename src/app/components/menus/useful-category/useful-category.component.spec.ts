import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulCategoryComponent } from './useful-category.component';

describe('UsefulCategoryComponent', () => {
  let component: UsefulCategoryComponent;
  let fixture: ComponentFixture<UsefulCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefulCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefulCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
