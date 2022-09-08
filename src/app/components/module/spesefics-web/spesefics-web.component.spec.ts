import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseficsWebComponent } from './spesefics-web.component';

describe('SpeseficsWebComponent', () => {
  let component: SpeseficsWebComponent;
  let fixture: ComponentFixture<SpeseficsWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeseficsWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeseficsWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
