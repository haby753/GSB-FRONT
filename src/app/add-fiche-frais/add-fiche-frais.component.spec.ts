import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFicheFraisComponent } from './add-fiche-frais.component';

describe('AddFicheFraisComponent', () => {
  let component: AddFicheFraisComponent;
  let fixture: ComponentFixture<AddFicheFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFicheFraisComponent]
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
