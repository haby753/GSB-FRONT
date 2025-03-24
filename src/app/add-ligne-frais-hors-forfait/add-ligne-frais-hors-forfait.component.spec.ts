import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLigneFraisHorsForfaitComponent } from './add-ligne-frais-hors-forfait.component';

describe('AddLigneFraisHorsForfaitComponent', () => {
  let component: AddLigneFraisHorsForfaitComponent;
  let fixture: ComponentFixture<AddLigneFraisHorsForfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLigneFraisHorsForfaitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLigneFraisHorsForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
