import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteprofildoctorComponent } from './completeprofildoctor.component';

describe('CompleteprofildoctorComponent', () => {
  let component: CompleteprofildoctorComponent;
  let fixture: ComponentFixture<CompleteprofildoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteprofildoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteprofildoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
