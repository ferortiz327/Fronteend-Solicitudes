import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoVisitaComponent } from './traslado-visita.component';

describe('TrasladoVisitaComponent', () => {
  let component: TrasladoVisitaComponent;
  let fixture: ComponentFixture<TrasladoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasladoVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
