import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { VisiteurService } from './visiteur.service';

describe('VisiteurService', () => {
  let service: VisiteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(VisiteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
