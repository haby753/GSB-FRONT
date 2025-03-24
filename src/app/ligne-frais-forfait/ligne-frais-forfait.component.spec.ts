import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneFraisForfaitComponent } from './ligne-frais-forfait.component';

describe('LigneFraisForfaitComponent', () => {
  let component: LigneFraisForfaitComponent;
  let fixture: ComponentFixture<LigneFraisForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneFraisForfaitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneFraisForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
