import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EtatService } from './etat.service';

describe('EtatService', () => {
  let service: EtatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(EtatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
