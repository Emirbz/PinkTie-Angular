import { TestBed } from '@angular/core/testing';

import { OrdonnanceService } from './ordonnance.service';

describe('OrdonnanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdonnanceService = TestBed.get(OrdonnanceService);
    expect(service).toBeTruthy();
  });
});
