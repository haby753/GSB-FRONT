import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFicheFraisComponent } from './consulter-fiche-frais.component';

describe('ConsulterFicheFraisComponent', () => {
  let component: ConsulterFicheFraisComponent;
  let fixture: ComponentFixture<ConsulterFicheFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterFicheFraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterFicheFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
