import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInboxComponent } from './patient-inbox.component';

describe('PatientInboxComponent', () => {
  let component: PatientInboxComponent;
  let fixture: ComponentFixture<PatientInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
