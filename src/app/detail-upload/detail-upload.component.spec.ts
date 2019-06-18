import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUploadComponent } from './detail-upload.component';

describe('DetailUploadComponent', () => {
  let component: DetailUploadComponent;
  let fixture: ComponentFixture<DetailUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
