import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifpatientComponent } from './modifpatient.component';

describe('ModifpatientComponent', () => {
  let component: ModifpatientComponent;
  let fixture: ComponentFixture<ModifpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
