import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FraisForfaitComponent } from './frais-forfait.component';

describe('FraisForfaitComponent', () => {
  let component: FraisForfaitComponent;
  let fixture: ComponentFixture<FraisForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisForfaitComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
