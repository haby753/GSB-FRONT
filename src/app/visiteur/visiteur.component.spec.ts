import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { VisiteurComponent } from './visiteur.component';

describe('VisiteurComponent', () => {
  let component: VisiteurComponent;
  let fixture: ComponentFixture<VisiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisiteurComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
