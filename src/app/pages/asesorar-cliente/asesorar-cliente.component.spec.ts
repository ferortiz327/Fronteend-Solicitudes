import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorarClienteComponent } from './asesorar-cliente.component';

describe('AsesorarClienteComponent', () => {
  let component: AsesorarClienteComponent;
  let fixture: ComponentFixture<AsesorarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesorarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
