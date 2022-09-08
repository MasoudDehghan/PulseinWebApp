import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersIdeaComponent } from './users-idea.component';

describe('UsersIdeaComponent', () => {
  let component: UsersIdeaComponent;
  let fixture: ComponentFixture<UsersIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
