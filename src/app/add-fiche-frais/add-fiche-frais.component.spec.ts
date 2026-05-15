import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AddFicheFraisComponent } from './add-fiche-frais.component';

describe('AddFicheFraisComponent', () => {
  let component: AddFicheFraisComponent;
  let fixture: ComponentFixture<AddFicheFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFicheFraisComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFicheFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
