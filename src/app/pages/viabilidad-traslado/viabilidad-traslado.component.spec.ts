import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViabilidadTrasladoComponent } from './viabilidad-traslado.component';

describe('AprobartareaComponent', () => {
  let component: ViabilidadTrasladoComponent;
  let fixture: ComponentFixture<ViabilidadTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViabilidadTrasladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilidadTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
