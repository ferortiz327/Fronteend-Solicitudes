import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoElectronicoComponent } from './traslado-electronico.component';

describe('TrasladoElectronicoComponent', () => {
  let component: TrasladoElectronicoComponent;
  let fixture: ComponentFixture<TrasladoElectronicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasladoElectronicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladoElectronicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
