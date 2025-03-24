import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneFraisHorsForfaitComponent } from './ligne-frais-hors-forfait.component';

describe('LigneFraisHorsForfaitComponent', () => {
  let component: LigneFraisHorsForfaitComponent;
  let fixture: ComponentFixture<LigneFraisHorsForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneFraisHorsForfaitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneFraisHorsForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
