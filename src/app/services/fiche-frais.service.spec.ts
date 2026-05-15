import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FicheFraisService } from './fiche-frais.service';

describe('FicheFraisService', () => {
  let service: FicheFraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FicheFraisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
