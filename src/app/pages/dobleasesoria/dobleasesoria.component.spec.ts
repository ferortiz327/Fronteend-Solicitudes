import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobleasesoriaComponent } from './dobleasesoria.component';

describe('DobleasesoriaComponent', () => {
  let component: DobleasesoriaComponent;
  let fixture: ComponentFixture<DobleasesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DobleasesoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DobleasesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
