import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpatientComponent } from './detailpatient.component';

describe('DetailpatientComponent', () => {
  let component: DetailpatientComponent;
  let fixture: ComponentFixture<DetailpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
