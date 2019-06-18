import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpatientsComponent } from './listpatients.component';

describe('ListpatientsComponent', () => {
  let component: ListpatientsComponent;
  let fixture: ComponentFixture<ListpatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
