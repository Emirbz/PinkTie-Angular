import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Historique2Component } from './historique2.component';

describe('Historique2Component', () => {
  let component: Historique2Component;
  let fixture: ComponentFixture<Historique2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Historique2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Historique2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
