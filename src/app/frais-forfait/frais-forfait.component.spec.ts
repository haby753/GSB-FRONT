import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisForfaitComponent } from './frais-forfait.component';

describe('FraisForfaitComponent', () => {
  let component: FraisForfaitComponent;
  let fixture: ComponentFixture<FraisForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisForfaitComponent]
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
