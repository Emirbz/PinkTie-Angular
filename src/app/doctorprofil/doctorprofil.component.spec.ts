import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorprofilComponent } from './doctorprofil.component';

describe('DoctorprofilComponent', () => {
  let component: DoctorprofilComponent;
  let fixture: ComponentFixture<DoctorprofilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorprofilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
