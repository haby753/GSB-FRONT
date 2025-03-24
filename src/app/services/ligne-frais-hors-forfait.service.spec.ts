import { TestBed } from '@angular/core/testing';

import { LigneFraisHorsForfaitService } from './ligne-frais-hors-forfait.service';

describe('LigneFraisHorsForfaitService', () => {
  let service: LigneFraisHorsForfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneFraisHorsForfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
