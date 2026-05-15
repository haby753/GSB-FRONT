import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FraisForfaitService } from './frais-forfait.service';

describe('FraisForfaitService', () => {
  let service: FraisForfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FraisForfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
