import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarAconocerComponent } from './dar-aconocer.component';

describe('DarAconocerComponent', () => {
  let component: DarAconocerComponent;
  let fixture: ComponentFixture<DarAconocerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarAconocerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarAconocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
