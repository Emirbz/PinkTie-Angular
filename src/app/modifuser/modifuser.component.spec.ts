import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifuserComponent } from './modifuser.component';

describe('ModifuserComponent', () => {
  let component: ModifuserComponent;
  let fixture: ComponentFixture<ModifuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
