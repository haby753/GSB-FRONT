import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { LigneFraisHorsForfaitService } from './ligne-frais-hors-forfait.service';

describe('LigneFraisHorsForfaitService', () => {
  let service: LigneFraisHorsForfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(LigneFraisHorsForfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
