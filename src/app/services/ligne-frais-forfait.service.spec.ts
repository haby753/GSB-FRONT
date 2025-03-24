import { TestBed } from '@angular/core/testing';

import { LigneFraisForfaitService } from './ligne-frais-forfait.service';

describe('LigneFraisForfaitService', () => {
  let service: LigneFraisForfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneFraisForfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
