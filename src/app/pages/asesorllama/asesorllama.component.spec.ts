import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorllamaComponent } from './asesorllama.component';

describe('AsesorllamaComponent', () => {
  let component: AsesorllamaComponent;
  let fixture: ComponentFixture<AsesorllamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesorllamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorllamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
