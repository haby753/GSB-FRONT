import { TestBed } from '@angular/core/testing';

import { FraisForfaitService } from './frais-forfait.service';

describe('FraisForfaitService', () => {
  let service: FraisForfaitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraisForfaitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
