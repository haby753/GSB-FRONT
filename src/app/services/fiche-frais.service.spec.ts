import { TestBed } from '@angular/core/testing';

import { FicheFraisService } from './fiche-frais.service';

describe('FicheFraisService', () => {
  let service: FicheFraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheFraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
